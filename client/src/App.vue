<template>
  <div id="app">
    <Navbar></Navbar>
    <b-container class="d-flex justify-content-center">
      <b-card-group deck style="margin-top:30px;">
        <OutsideCard
          v-for="(progress, i) in progresses"
          :key="i"
          :progress="progress"
          @go-to-detail="detailTodo"
        ></OutsideCard>
      </b-card-group>
    </b-container>
    <div>
      <b-modal id="modal-1" ref="my-modal" ok-title="OK">
        <b-card-title>Detail Task</b-card-title>
        <form>
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label">Title:</label>
            <div class="col-sm-10">
              <input type="text" class="form-control-plaintext" v-model="isDetailTodo.title" />
            </div>
          </div>
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label">Desc:</label>
            <div class="col-sm-10">
              <input type="text" class="form-control-plaintext" v-model="isDetailTodo.description" />
            </div>
          </div>
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label">point:</label>
            <div class="col-sm-10">
              <input type="number" class="form-control-plaintext" v-model="isDetailTodo.point" />
            </div>
          </div>
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-2 col-form-label">assigned to:</label>
            <div class="col-sm-10">
              <input type="text" class="form-control-plaintext" v-model="isDetailTodo.assignedto" />
            </div>
          </div>
        </form>
        <b-card-text class="d-flex justify-content-around">
          <button v-if="isDetailTodo.status != 'Back-Log'" @click.prevent="downStatus">
            <i class="fas fa-arrow-circle-left"></i>
          </button>
          <button v-if="isDetailTodo.status != 'Done'" @click.prevent="upStatus">
            <i class="fas fa-arrow-circle-right"></i>
          </button>
        </b-card-text>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import OutsideCard from "@/components/outside-card.vue";
import db from "../apis/firebase";

export default {
  components: {
    Navbar,
    OutsideCard
  },

  data() {
    return {
      progresses: [
        {
          name: "Back-Log",
          color: "dark",
          task: []
        },
        {
          name: "To-Do",
          color: "warning",
          task: []
        },
        {
          name: "Doing",
          color: "info",
          task: []
        },
        {
          name: "Done",
          color: "success",
          task: []
        }
      ],
      isDetailTodo: {},
      updateTodo: {}
    };
  },

  methods: {
    detailTodo(isTodo) {
      this.isDetailTodo = isTodo;
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    upStatus() {
      let next = this.findIndex(this.isDetailTodo.status);

      db.collection("kanban")
        .doc(this.isDetailTodo.id)
        .update({ status: next })
        .then(() => {
          this.hideModal();
        })
        .catch(console.log);
    },
    findIndex(currentIndex) {
      let nextIndex = currentIndex;
      for (let i = 0; i < this.progresses.length; i++) {
        if (this.progresses[i].name == currentIndex) {
          nextIndex = this.progresses[i + 1].name;
        }
      }
      return nextIndex;
    },
    downStatus() {
      let down = this.downIndex(this.isDetailTodo.status);
      db.collection("kanban")
        .doc(this.isDetailTodo.id)
        .update({ status: down })
        .then(() => {
          this.hideModal();
        })
        .catch(console.log);
    },
    downIndex(currentIndex) {
      let downIndex = currentIndex;
      for (let i = 0; i < this.progresses.length; i++) {
        if (this.progresses[i].name == currentIndex)
          downIndex = this.progresses[i - 1].name;
      }
      return downIndex;
    }
  },

  created() {
    db.collection("kanban").onSnapshot(querySnapshot => {
      this.progresses.map(el => {
        el.task = [];
        return el;
      });
      querySnapshot.forEach(doc => {
        const isStatus = doc.data().status;
        const sameStatus = this.progresses.findIndex(el => el.name == isStatus);
        this.progresses[sameStatus].task.push({ id: doc.id, ...doc.data() });
      });
    });
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
