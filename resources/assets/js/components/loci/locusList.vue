<template>
    <div>
        <div class="btn-wrapper">
            <router-link to="/loci/new" class="btn btn-primary btn-sm">New</router-link>
        </div>
        <table class="table">
            <thead>
                <th>Locus</th>
                <th>Description</th>
                <th>Deposit</th>
                <th>Actions</th>
            </thead>
            <tbody>
                <template v-if="!loci.length">
                    <tr>
                        <td colspan="4" class="text-center">No Loci Available</td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="locus in loci" :key="locus.id">
                        <td>{{ locus.locus }}</td>
                        <td>{{ locus.description }}</td>
                        <td>{{ locus.deposit }}</td>
                        <td>
                            <router-link :to="`/loci/${locus.id}`">View</router-link>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>



   
    </div>
</template>

<script>
    export default {
        name: 'locus-list',
        mounted() {
            if (this.loci.length) {
                return;
            }
            
            this.$store.dispatch('getLoci');
        },
        computed: {
            loci() {
                return this.$store.getters.loci;
            }
        }
    }
</script>

<style scoped>
.btn-wrapper {
    text-align: right;
    margin-bottom: 20px;
}
</style>