<template>
  <div class="searchBar">
    <!-- Filter Search -->
    <div class="input-group mb-3">
      <input
        type="search"
        class="form-control"
        v-model="searchQuery"
        placeholder="Search "
      />
    </div>
  </div>

  <table id="tableComponent" class="table table-bordered table-striped">
    <thead>
      <tr>
        <!-- loop through each value of the fields to get the table header hello-->
        <th v-for="field in fields" :key="field" @click="sortTable(field)">
          {{ field }}
          <span class="material-symbols-outlined icon-align"> swap_vert </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <!-- Loop through the list get the each student data -->
      <tr v-for="item in filteredList" :key="item">
        <td v-for="field in fields" :key="field">
          <template v-if="field === 'Actions'">
            <!-- Append child element here if field is "Actions" -->
            <div class="text-center" v-html="item[field]"></div>
          </template>

          <!-- Display item[field] for other fields -->
          <template v-else>
            {{ item[field] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
  <script>
import { computed, ref } from "vue";
// Importing  the lodash library
import { sortBy } from "lodash";

export default {
  name: "TableComponent",
  props: {
    Data: {
      type: Array,
    },
    fields: {
      type: Array,
    },
  },
  methods: {
    parseHTML(htmlString) {
      const parser = new DOMParser();
      // Parse the HTML string into a new HTML document
      const htmlDocument = parser.parseFromString(htmlString, "text/html");
      const element = htmlDocument.querySelector("button");

      return element;
    },
    renderButtons() {
      for (const item of this.filteredList) {
        for (const field of this.fields) {
          if (field === "Actions") {
            console.log(item[field]);
            conso;

            // Append the button element to the <td>
            //element.appendChild(this.parseHTML(item[field]));
          }
        }
      }
    },
  },

  setup(props) {
    let sort = ref(false);
    let updatedList = ref([]);
    let searchQuery = ref("");

    // a function to sort the table
    const sortTable = (col) => {
      sort.value = !sort.value;
      // Use of _.sortBy() method
      updatedList.value = sortBy(props.Data, col);
    };

    const sortedList = computed(() => {
      if (sort.value) {
        return updatedList.value;
      } else {
        return props.Data;
      }
    });

    // Filter Search
    const filteredList = computed(() => {
      return sortedList.value.filter((product) => {
        const searchQueryLower = searchQuery.value.toLowerCase();
        for (const key in product) {
          if (product.hasOwnProperty(key)) {
            const propertyValue = product[key].toLowerCase();
            if (propertyValue.indexOf(searchQueryLower) !== -1) {
              return true;
            }
          }
        }
        return false;
      });
    });

    return { sortedList, sortTable, searchQuery, filteredList };
  },
};
</script>
  
<style scoped>
table th:hover {
  background: #f2f2f2;
}

.icon-align {
  vertical-align: text-bottom;
}
</style>