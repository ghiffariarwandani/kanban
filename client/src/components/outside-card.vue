<template>
  <div>
    <b-card
      :header="progress.name"
      header-text-variant="white"
      header-tag="header"
      :header-bg-variant="progress.color"
      style="width: 15rem;"
    >
      <Card
        v-for="onprogress in progress.task"
        :key="onprogress.id"
        :onprogress="onprogress"
        @go-to-modal-detail="showModalDetail($event)"
      ></Card>
    </b-card>

   
  </div>
</template>

<script>
import Card from "@/components/card.vue";

export default {
  props: ["progress"],
  components: {
    Card
  },
  data() {
    return {
      isDetail: {}
    };
  },
  methods: {
    showModalDetail(todoid) {
      let isTodo = this.progress.task.find(el => el.id == todoid);
      this.isDetail = isTodo;
      this.$emit('go-to-detail', this.isDetail)
    }
  }
};
</script>

<style>
</style>