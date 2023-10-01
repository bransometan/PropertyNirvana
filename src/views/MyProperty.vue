<template>
  <main class="myproperty-page">
    <h1>My Property</h1>
    <!-- Add Property component -->
    <AddProperty @addedProperty="change" />
    <div
      class="overflow-auto p-3"
      style="min-height: 200px; max-height: 400px; width: 100%"
    >
      <!-- The Property Table component -->
      <Table
        :key="refreshComp"
        :fields="Propertyfields"
        :Data="PropertyData"
      ></Table>
      <h5 class="text-center" v-if="PropertyData.length == 0">
        There are currently no records available
      </h5>
    </div>
    <h1 class="my-5">Manage Rental</h1>
    <div
      class="overflow-auto p-3"
      style="min-height: 200px; max-height: 400px; width: 100%"
    >
      <!-- The Manage Rental Table component -->
      <Table
        :key="refreshComp"
        :fields="Tenantfields"
        :Data="TenantData"
      ></Table>
      <h5 class="text-center" v-if="TenantData.length == 0">
        There are currently no records available
      </h5>
    </div>
  </main>
</template>
  
<script>
// Importing the table component
import Table from "../components/Table.vue";
import AddProperty from "../components/AddProperty.vue";
import { auth, db } from "../firebase.js";

import {
  collection,
  getDocs,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";

export default {
  name: "App",
  components: {
    Table,
    AddProperty,
  },
  data() {
    return {
      refreshComp: 0,
      PropertyData: [],
      Propertyfields: [
        "ID",
        "Property_Type",
        "Postal_Code",
        "Address",
        "Unit_Number",
        "Purchase_Price",
        "Upfront_Payment",
        "Actions",
      ],
      TenantData: [],
      Tenantfields: [
        "ID",
        "Tenant_Name",
        "Monthly_Rent",
        "Contract_Start_Date",
        "Contract_End_Date",
        "Unpaid_Months",
        "Next_Payment_Date",
        "Actions",
      ],
    };
  },
  methods: {
    change() {
      this.refreshComp += 1;
      console.log("Refreshed!");
      auth.onAuthStateChanged((newUserState) => {
        let user = newUserState;
        this.displayProperty(user).then((result) => {
          this.PropertyData = result;
        });
        this.displayTenant(user).then((result) => {
          this.TenantData = result;
        });
      });
    },
    async displayProperty(user) {
      let q = query(
        collection(db, "Property"),
        where("userId", "==", user.uid),
        orderBy("timestamp", "desc")
      );
      //console.log(auth.currentUser.uid);
      const querySnapshot = await getDocs(q);
      let index = 1;
      let propertyData = [];

      querySnapshot.forEach((docs) => {
        let documentData = docs.data();

        let propertyType = documentData.isOwnerOccupied;
        let postalCode = documentData.postalCode;
        let fullAddress = documentData.address;
        let unitNumber = documentData.unitNumber;
        let purchasePrice = documentData.purchasePrice;
        let upfrontPayment = documentData.upfrontPayment;

        let viewButton =
          '<button type="button" id="vp_' +
          index +
          '" class="btn btn-primary mb-3">View Tenant Transactions</button>';
        let manageButton =
          '<button type="button" id="mp_' +
          index +
          '" class="btn btn-primary">Manage Property</button>';

        if (propertyType == "0") {
          propertyData.push({
            ID: index.toString(),
            Property_Type:
              propertyType == "0" ? "Owner Occupied" : "Rental/Investment",
            Postal_Code: postalCode,
            Address: fullAddress,
            Unit_Number: "#" + unitNumber,
            Purchase_Price: "$" + purchasePrice,
            Upfront_Payment: "$" + upfrontPayment,
            Actions: manageButton,
          });
        } else {
          propertyData.push({
            ID: index.toString(),
            Property_Type:
              propertyType == "0" ? "Owner Occupied" : "Rental/Investment",
            Postal_Code: postalCode,
            Address: fullAddress,
            Unit_Number: "#" + unitNumber,
            Purchase_Price: "$" + purchasePrice,
            Upfront_Payment: "$" + upfrontPayment,
            Actions: viewButton + "<br/>" + manageButton,
          });
        }

        index += 1;
      });

      //console.log(JSON.stringify(propertyData));
      return propertyData;
    },
    async displayTenant(user) {
      let q = query(
        collection(db, "Tenant"),
        where("userId", "==", user.uid),
        orderBy("timestamp", "desc")
      );
      //console.log(auth.currentUser.uid);
      const querySnapshot = await getDocs(q);
      let index = 1;
      let TenantData = [];

      querySnapshot.forEach((docs) => {
        let documentData = docs.data();

        let firstName = documentData.firstName;
        let lastName = documentData.lastName;
        let fullName = firstName + " " + lastName;
        let monthlyRent = documentData.monthlyRent.toString();
        let contractStartDate = documentData.contractStartDate.toString();
        let contractEndDate = documentData.contractEndDate.toString();
        let unpaidMonths = documentData.unpaidMonths.toString();
        let nextPaymentDate =
          documentData.nextPaymentDate == undefined
            ? ""
            : new Date(documentData.nextPaymentDate.toDate())
                .toISOString()
                .split("T")[0]
                .toString();

        let manageButton =
          '<button type="button" id="mt_' +
          index +
          '" class="btn btn-primary">Manage Payment</button>';

        TenantData.push({
          ID: index.toString(),
          Tenant_Name: fullName,
          Monthly_Rent: "$" + monthlyRent,
          Contract_Start_Date: contractStartDate,
          Contract_End_Date: contractEndDate,
          Unpaid_Months: unpaidMonths,
          Next_Payment_Date: nextPaymentDate,
          Actions: manageButton,
        });

        index += 1;
      });

      //console.log(JSON.stringify(propertyData));
      return TenantData;
    },
  },
  mounted() {
    auth.onAuthStateChanged((newUserState) => {
      let user = newUserState;
      this.displayProperty(user).then((result) => {
        this.PropertyData = result;
      });
      this.displayTenant(user).then((result) => {
        this.TenantData = result;
      });
    });
  },
};
</script>
  
  <style>
</style>