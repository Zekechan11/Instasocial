const cuid = localStorage.getItem('user_id');

const main = Vue.createApp({
    data() {
        return {
            uid: "",
            sugg: [],
            notiff: 0
        }
    },
    created() {
        this.uid = localStorage.getItem('user_id');
        this. getAllNotif();
        this.suggestions();
    },
    methods: {
        suggestions() {
            fetch(`../api/user/suggest_user.php?uid=${cuid}`)
            .then((data) => data.json())
            .then((result) => {
                this.sugg = result;
            });
        },
        getAllNotif() {
            const eventSource = new EventSource(`../api/notif/count_notif.php?uid=${cuid}`);
            eventSource.onmessage = event => {
                const data = JSON.parse(event.data);
                this.notiff = data.total_likes;
              };
        }
    }
});

main.mount('#main');


/**************************search+notif-section **************************/
//search section notif
let search = document.getElementById("search");
let search_icon = document.getElementById("search_icon");
search_icon.addEventListener("click", function(){
  search.classList.toggle("show");
});

let notification = document.getElementById("notification");
let notification_icon = document.querySelectorAll(".notification_icon");
notification_icon.forEach( (notif)=>{
  notif.addEventListener('click',function(){
    notification.classList.toggle("show");
  })
} 
)