

<template>

<f7-page>
    <f7-navbar title="Cognos Folder" back-link="Back" sliding></f7-navbar>
    <f7-preloader v-if="pending" color="blue" size="44px"></f7-preloader>
    <div class="pull-to-refresh-layer">
      <div class="preloader"></div>
      <div class="pull-to-refresh-arrow"></div>
    </div>
    <f7-block inner page-content pull-to-refresh-content>
      <div class="pull-to-refresh-layer">
        <div class="preloader"></div>
        <div class="pull-to-refresh-arrow"></div>
      </div>

        <grid :draggable="true" :sortable="true" :items="mcreports" :height="100" :width="300" :cellWidth="300">
            <template slot="cell" slot-scope="props" >
                <McReport :color="color" :object-id="props.item.id" :index="props.index" :with-button="false" @click="loadFolder(props.item.id)"></McReport>
            </template>
        </grid>

    </f7-block>
    <f7-block>
        <div v-if="!!folders.length" class="ui folders-list cards">
            <div v-for="folder in folders" :key="folder.name" class="ui card fadeIn-animation">
                <div class="content">


                    <div class="header">                  <f7-icon v-if="folder.type === ''" f7="home"></f7-icon >
                                      <f7-icon v-if="folder.type === 'folder'" f7="folder"></f7-icon >
                                      <f7-icon v-if="folder.type === 'report'" f7="document_text_fill"></f7-icon >
 {{folder.name}}</div>
                    <div class="description">
                        {{folder.id}}
                    </div>
                    <div class="type">
                        {{folder.type}}
                    </div>
                    <div class="searchPath">
                        {{folder.searchPath}}
                    </div>
                </div>
                <div class="extra content">
                    <span class="right floated">
          <button v-if="folder.type !== 'report'" v-on:click="loadFolder(folder.id);" class="ui icon purple tiny button">
              load folder
          </button>
          <button v-if="folder.type === 'report'" v-on:click="loadReport(folder.id);" class="ui icon purple tiny button">
              load report
          </button>
          <f7-link :href="'/folder/' + folder.id">
        </f7-link>
      </span>
                </div>
            </div>
        </div>
    </f7-block>
    <f7-block inner>
        <f7-list-button title="Store Folder" v-on:click="storeFolder();"></f7-list-button>
    </f7-block>

</f7-page>

</template>

<script>
import { mapGetters } from 'vuex';

import McReport from '../components/McReport.vue';
import loading from 'vue-full-loading';

export default {
  props: {
    color: {
      type: Object,
      default: function() {
        return {
          r: 0,
          g: 103,
          b: 127
        };
      }
    },
    label: {
      default: function() {
        return 'Loading...';
      }
    }
  },
  data: function() {
    return {
      objectId: this.$route.params.folderId
    };
  },
  components: {
    McReport,
    loading
  },
  created() {
    this.objectId = this.$route.params.folderId;
    var params = {
      id: this.$route.params.folderId,
      types: ['folder', 'report']
    };
    this.$store.dispatch('FETCH_FOLDERS', params);
  },
  computed: mapGetters(['folders', 'mcreports', 'pending']),

  methods: {
    loadFolder(id) {
      this.objectId = id;
      var params = {
        id: id,
        types: ['folder', 'report']
      };
      this.$store.dispatch('FETCH_FOLDERS', params);
    },
    loadReport(id) {
      //  This could be push (and then store history)
      //    https://router.vuejs.org/en/essentials/navigation.html
      f7.mainView.router.reloadPage({
        url: '/report/' + id
      });
    },
    storeFolder() {
      localStorage.setItem('cognosRootfolder', this.objectId);
    }
  }
};
</script>
