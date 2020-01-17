import { mapState } from "vuex";

export const mixinMsg = {
  computed: {
    ...mapState({
      apiMsg: state => state.users.resMsg.msg,
      type: state => state.users.resMsg.type
    }),
  }
}