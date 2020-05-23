<template>
  <div id="app">
    <form action="#" @submit.prevent="getIssues">
      <div class="form-group">
        <input
          type="text"
          placeholder="owner/repo Name"
          v-model="repository"
          class="col-md-2 col-md-offset-5"
        >
      </div>
    </form>
<<<<<<< HEAD
    <chart :issues="issues"></chart>
=======
>>>>>>> c8edc1335652aa8c22b5ae4ee996e45e523ef394
  </div>
</template>

<script>
<<<<<<< HEAD
import moment from "moment";
import axios from "axios";
import Chart from './components/Chart.vue';

export default {
  name: "app",
  components: {
    Chart
  },
  data() {
    return {
      issues: [],
      repository: "",
      startDate: null
    };
  },
  methods: {
      getDateRange() {
        const startDate = moment().subtract(6, 'days');
        const endDate = moment();
        const dates = [];

        while (startDate.isSameOrBefore(endDate)) {
          dates.push({
            day: startDate.format('MMM Do YY'),
            issues: 0
          });

          startDate.add(1, 'days');
        }

        return dates;
      },
     getIssues() {
      this.startDate = moment()
        .subtract(6, "days")
        .format("YYYY-MM-DD");

      axios
        .get(
          `https://api.github.com/search/issues?q=repo:${this.repository}+is:issue+is:open+created:>=${this.startDate}`,
          { params: { per_page: 100 } }
        )
        .then(response => {
          const payload = this.getDateRange();

          response.data.items.forEach(item => {
            const key = moment(item.created_at).format("MMM Do YY");
            const obj = payload.filter(o => o.day === key)[0];
            obj.issues += 1;
          })

          this.issues = payload;
          console.log(this.issues);
        })
          .catch(error => {
            console.error(error);
          });

    }
      }
    };

=======
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
>>>>>>> c8edc1335652aa8c22b5ae4ee996e45e523ef394
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
