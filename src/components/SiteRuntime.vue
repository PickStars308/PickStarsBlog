<template>
  <div>
    <p>站点已运行：{{ years }} 年 {{ months }} 月 {{ days }} 天</p>
  </div>
</template>

<script>
export default {
  name: "SiteRuntime",
  data() {
    return {
      startDate: new Date('2025-04-13T00:00:00'),
      now: new Date()
    };
  },
  computed: {
    diff() {
      const start = this.startDate;
      const end = this.now;
      let years = end.getFullYear() - start.getFullYear();
      let months = end.getMonth() - start.getMonth();
      let days = end.getDate() - start.getDate();

      if (days < 0) {
        months--;
        const lastMonthDate = new Date(end.getFullYear(), end.getMonth(), 0);
        days += lastMonthDate.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      return { years, months, days };
    },
    years() {
      return this.diff.years;
    },
    months() {
      return this.diff.months;
    },
    days() {
      return this.diff.days;
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.now = new Date();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>

</style>
