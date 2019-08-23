<template>
  <div>
    <b-card :header="onprogress.title" style="max-width: 30rem;" class="mb-2">
      <div class="d-flex justify-content-center">
        <b-card-text>
          <small>
            point: {{ onprogress.point }}
            <br />
          </small>
          <small>assigned to: {{ onprogress.assignedto }}</small>
          <br />
          <a href="#" @click.prevent="clickDetail(onprogress.id)" @click="showModal" ref="btnShow">
            <i class="fas fa-info-circle"></i>
          </a>
          &nbsp;
          <a href @click.prevent="clickDelete(onprogress.id)">
            <i class="fas fa-trash"></i>
          </a>
        </b-card-text>
      </div>
    </b-card>
  </div>
</template>

<script>
import db from '../../apis/firebase'

export default {
  data() {
    return {};
  },

  props: ["onprogress"],

  methods: {
    clickDetail(todoid) {
      console.log(todoid);
      this.$emit("go-to-modal-detail", todoid);
    },
    showModal() {
      this.$root.$emit("bv::show::modal", "modal-1", "#btnShow");
    },
    clickDelete(todoid) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          db.collection('kanban')
            .doc(todoid)
            .delete()
            .then(() => {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            })
        }
      });
    }
  }
};
</script>

<style>
</style>