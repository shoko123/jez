<template>
    <div class="locus-view" v-if="locus">
        <div class="user-img">
            <img src="https://www.scottsdaleazestateplanning.com/wp-content/uploads/2018/01/user.png" alt="">
        </div>
        <div class="user-info">
            <table class="table">
                <tr>
                    <th>Locus id</th>
                    <td>{{ locus.id }}</td>
                </tr>
                <tr>
                    <th>area id</th>
                    <td>{{ locus.area_id }}</td>
                </tr>
                <tr>
                    <th>locus number</th>
                    <td>{{ locus.locus }}</td>
                </tr>
                <tr>
                    <th>description</th>
                    <td>{{ locus.description }}</td>
                </tr>
            </table>
            <router-link to="/loci">Back to all loci</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'locus-show',
        created() {
            if (this.loci.length) {
                this.locus = this.loci.find((loci) => loci.id == this.$route.params.id);
            } else {
                axios.get(`/api/loci/${this.$route.params.id}`)
                    .then((response) => {
                        this.locus = response.data.locus
                    });
            }
        },
        data() {
            return {
                locus: null
            };
        },
        computed: {
            currentUser() {
                return this.$store.getters.currentUser;
            },
            loci() {
                return this.$store.getters.loci;
            }
        }
    }
</script>

<style scoped>
.locus-view {
    display: flex;
    align-items: center;
}
.user-img {
    flex: 1;
}
.user-img img {
    max-width: 160px;
}
.user-info {
    flex: 3;
    overflow-x: scroll;
}
</style>
