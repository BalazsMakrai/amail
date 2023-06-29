import { defineStore } from "pinia";
import axios from "axios";
import { db } from "@/firebase-init";
import { onSnapshot, query, where, collection } from "firebase/firestore";
axios.defaults.baseURL = "http://localhost:4001/";
export const useUserStore = defineStore("user", {
  state: () => ({
    sub: "",
    email: "",
    picture: "",
    firstName: "",
    lastName: "",
    emails: [],
  }),
  actions: {
    async getUserDetailsFromGoogle(data) {
      let res = await axios.post("api/google-login", {
        token: data.credential,
      });
      console.log(res);
      this.$state.sub = res.data.sub;
      this.$state.email = res.data.email;
      this.$state.picture = res.data.picture;
      this.$state.firstName = res.data.given_name;
      this.$state.lastName = res.data.family_name;
    },
    clearUser() {
      this.$state.sub = null;
      this.$state.email = null;
      this.$state.picture = null;
      this.$state.firstName = null;
      this.$state.lastName = null;
    },
    getEmailsByEmailAddress() {
      const q = query(
        collection(db, "emails"),
        where("toEmail", "==", "john.doe@mail.com")
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
              createdAt: doc.data().createdAt,
            });
          });
          this.$state.emails = resultArray;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  persist: true,
});
