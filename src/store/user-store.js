import { defineStore } from "pinia";
import axios from "axios";
import { db } from "@/firebase-init";
import { v4 as uuid } from "uuid";
import moment from "moment/moment";
import {
  onSnapshot,
  query,
  where,
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  orderBy,
} from "firebase/firestore";
axios.defaults.baseURL = "http://localhost:4001/";
export const useUserStore = defineStore("user", {
  state: () => ({
    sub: "",
    email: "",
    picture: "",
    firstName: "",
    lastName: "",
    emails: [],
    pina: [],
  }),
  actions: {
    async getUserDetailsFromGoogle(data) {
      let res = await axios.post("api/google-login", {
        token: data.credential,
      });
      this.$state.sub = res.data.sub;
      this.$state.email = res.data.email;
      this.$state.picture = res.data.picture;
      this.$state.firstName = res.data.given_name;
      this.$state.lastName = res.data.family_name;
    },
    searchEmail(query) {
      if (query.length == 0) {
        this.$state.emails = [...this.$state.pina];
      } else {
        let emailHelper = [...this.$state.pina];
        this.$state.emails = [];
        for (let email of emailHelper) {
          if (
            email.body.toLowerCase().includes(query.toLowerCase()) ||
            email.subject.toLowerCase().includes(query.toLowerCase()) ||
            email.firstName.toLowerCase().includes(query.toLowerCase()) ||
            email.lastName.toLowerCase().includes(query.toLowerCase())
          ) {
            this.$state.emails.push(email);
          }
        }
      }
    },
    clearUser() {
      this.$state.sub = null;
      this.$state.email = null;
      this.$state.picture = null;
      this.$state.firstName = null;
      this.$state.lastName = null;
      this.$state.emails = [];
    },
    getEmailsByEmailAddress() {
      const q = query(
        collection(db, "emails"),
        where("toEmail", "==", this.$state.email),
        orderBy("createdAt", "desc")
      );
      onSnapshot(
        q,
        (querySnapshot) => {
          const resultArray = [];
          querySnapshot.forEach((doc) => {
            resultArray.push({
              id: doc.id,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              fromEmail: doc.data().fromEmail,
              toEmail: doc.data().toEmail,
              subject: doc.data().subject,
              body: doc.data().body,
              hasViewed: doc.data().hasViewed,
              createdAt: moment(doc.data().createdAt).format("MMM D HH:mm"),
            });
          });
          this.$state.emails = resultArray;
          this.$state.pina = resultArray;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async sendEmail(data) {
      try {
        await setDoc(doc(db, "emails/" + uuid()), {
          firstName: this.$state.firstName,
          lastName: this.$state.lastName,
          fromEmail: this.$state.email,
          toEmail: data.toEmail,
          subject: data.subject,
          body: data.body,
          hasViewed: false,
          createdAt: Date.now(),
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteEmail(id) {
      try {
        await deleteDoc(doc(db, "emails", id));
      } catch (error) {
        console.log(error);
      }
    },
    async getEmailById(id) {
      const docRef = doc(db, "emails", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return {
          id: id,
          firstName: docSnap.data().firstName,
          lastName: docSnap.data().lastName,
          fromEmail: docSnap.data().fromEmail,
          toEmail: docSnap.data().toEmail,
          subject: docSnap.data().subject,
          body: docSnap.data().body,
          hasViewed: docSnap.data().hasViewed,
          createdAt: docSnap.data().createdAt,
        };
      } else {
        console.log("No such document!");
      }
    },
    async emailHasBeenViewed(id) {
      try {
        await setDoc(
          doc(db, "emails/", id),
          {
            hasViewed: true,
          },
          { merge: true }
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
  persist: true,
});
