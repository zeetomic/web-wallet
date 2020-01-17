import Cookies from 'js-cookie';

export const mixinReceive = {
    data() {
        return {
            user_profile: []
        }
    },
    // computed: {
    //     user_profile() {
    //         return this.$store.state.graph.user_profile
    //     }
    // },
    methods: {
        handleReceive() {
            // this.$store.dispatch('graph/query_User', {
            //     id: Cookies.get('id')
            // })
            // .then(() => {
            //     if(this.loading) {
            //         this.loading = this.$store.state.graph.loading;

            //     } else {
            //         this.dialogVisible_Receive = true;
            //     }
            // })
            this.$store.dispatch('users/GETUserProfile')
                .then(_=> {
                    this.user_profile = this.$store.state.users.user_profile
                    if(this.loading) {
                        this.loading = false;
                    } else {
                        this.dialogVisible_Receive = true;
                    }
                })
        },
        onCopy() {
            /* Get the text field */
            var copyText = document.getElementById("myInput");
            /* Select the text field */
            copyText.select();
            copyText.setSelectionRange(0, 99999); /*For mobile devices*/
            /* Copy the text inside the text field */
            document.execCommand("copy");
            /* Alert the copied text */
            alert("Copied the text: " + copyText.value);
        }
    },
}