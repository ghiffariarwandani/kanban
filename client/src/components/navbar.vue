<template>
  <div>
    <b-navbar-nav>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item style="font-weight: bold;">KANBAN</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item style="font-size: 20px;">
            <i v-b-modal.modal-create class="fas fa-plus-square"></i>
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </b-navbar-nav>
    <div>
      <b-modal
        id="modal-create"
        ref="modal-create"
        title="Submit Your Name"
        hide-footer
        @show="resetModal"
        @hidden="resetModal"
      >
        <form @submit.prevent="submitNewTask">
          <div class="form-group">
            <label for="exampleInputEmail1">Email Title</label>
            <input
              type="text"
              class="form-control"
              placeholder="Title"
              v-model="newTask.title"
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Enter Description</label>
            <input
              type="text"
              class="form-control"
              placeholder="Description"
              v-model="newTask.description"
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Enter point</label>
            <input
              type="number"
              class="form-control"
              placeholder="Description"
              v-model="newTask.point"
              required
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Assigned to</label>
            <input
              type="text"
              class="form-control"
              placeholder="Assigned To"
              v-model="newTask.assigned"
              required
            />
          </div>

          <button type="submit" class="btn btn-primary" @click="hideModal">Submit</button>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import db from "../../apis/firebase";

export default {
  data() {
    return {
      newTask: {
        title: "",
        description: "",
        point: "",
        assigned: ""
      }
    };
  },

  methods: {
    submitNewTask() {
      console.log(this.newTask.status);
      db.collection("kanban")
        .add({
          title: this.newTask.title,
          description: this.newTask.description,
          point: this.newTask.point,
          assignedto: this.newTask.assigned,
          status: "Back-Log"
        })
        .then(doc => {
          console.log("Document successfully written!");
          Swal.fire("Gotcha", "You created a new task!", "success");
        })
        .catch(console.log);
    },

    resetModal() {
      this.newTask = {};
    },

    hideModal() {
      this.$refs["modal-create"].hide();
    }
  }
};
</script>

<style>
</style>