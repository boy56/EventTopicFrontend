<template>
  <div>
    <dl class="dl-group first-cat">
      <dt>内容分类：</dt>
      <b-nav pills>
        <b-nav-item :active="!selectedCats" @click="selectAllLegacyTypes()">全部类别</b-nav-item>
        <b-nav-item v-for="(type, typeid) in types"
                    v-if="type !== '其他'"
                   :key="typeid"
                   :active="_.includes(selectedLegacyTypes, typeid)"
                   @click="selectLegacyType(typeid)">
          {{ type }}
        </b-nav-item>
      </b-nav>
    </dl>
    <!-- <dl class="dl-group others">
      <dt>事件&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;描述：</dt>
      <ul class="list-ul">
        <li class="list-btn" v-for="(lang, idx) in languages"
                            :key="idx"
                            :class="{ active: selectedLanguge === lang }"
                            @click="selectedLanguge = lang">
          {{ lang }}
        </li>
      </ul>
    </dl> -->
    <!-- <dl class="dl-group others">
      <dt>时间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;跨度：</dt>
      <ul class="list-ul">
        <li class="list-btn" v-for="(loc, idx) in locations"
                            :key="idx"
                            :class="{ active: selectedLocation === loc }"
                            @click="selectedLocation = loc">
          {{ loc }}
        </li>
      </ul>
    </dl> -->
  </div>
</template>

<script type="text/ecmascript-6">

  import { ManyType, Topic } from 'components/Const'

  export default {
    data () {
      return {
        categories: ManyType,
        types: ['入侵行动', '国家立场', '防卫行动', '军演行动', '媒体评论', '访问行动', '其他'],
        topics: Topic,
        languages: ['朝鲜拟重启洲际导弹试验和试验活动'],
        locations: ['全部', '2019-09-11', '2019-12-31'],
        selectedCats: [],
        selectedLegacyTypes: [],
        selectedLanguge: '全部',
        selectedLocation: '全部',
        selectedSecu: false,
        selectedTopics: [],
      };
    },
    computed: {
      selectedTypes: function () {
        return _.flatMap(this.selectedCats, cat => {
          return _.keys(this.categories[cat]);
        });
      },
      selectedWords: function () {
        return _.flatMap(this.selectedTopics, topic => {
          return this.topics[topic];
        });
      },
    },
    watch: {
      selectedCats: function () {
        this.emitUpdate();
      },
      selectedLegacyTypes: function () {
        this.emitUpdate();
      },
      selectedLanguge: function () {
        this.emitUpdate();
      },
      selectedLocation: function () {
        this.emitUpdate();
      },
      selectedSecu: function () {
        this.emitUpdate();
      },
      selectedTopics: function () {
        this.emitUpdate();
      },
    },
    methods: {
      selectCat (cat) {
        if (_.includes(this.selectedCats, cat)) {
          this.unselectCat(cat);
        } else {
          this.selectedCats.push(cat);
        }
      },
      selectLegacyType (typeid) {
        if (_.includes(this.selectedLegacyTypes, typeid)) {
          this.unselectLegacyType(typeid);
        } else {
          this.selectedLegacyTypes.push(typeid);
        }
      },
      selectTopic (topic) {
        if (_.includes(this.selectedTopics, topic)) {
          this.unselectTopic(topic);
        } else {
          this.selectedTopics.push(topic);
        }
      },
      unselectCat (cat) {
        this.$delete(this.selectedCats, _.indexOf(this.selectedCats, cat));
      },
      unselectLegacyType (typeid) {
        this.$delete(this.selectedLegacyTypes, _.indexOf(this.selectedLegacyTypes, typeid));
      },
      unselectTopic (topic) {
        this.$delete(this.selectedTopics, _.indexOf(this.selectedTopics, topic));
      },
      selectAllCats () {
        this.selectedCats = [];
        this.selectedWords = [];
      },
      selectAllLegacyTypes () {
        this.selectedLegacyTypes = [];
      },
      emitUpdate () {
        this.$emit('update:filter', {
          selectedCats: this.selectedCats,
          selectedTypes: this.selectedTypes,
          selectedLegacyTypes: this.selectedLegacyTypes,
          selectedLanguge: this.selectedLanguge,
          selectedLocation: this.selectedLocation,
          selectedSecu: this.selectedSecu,
          selectedWords: this.selectedWords,
        });
      },
    },
  }

</script>

<style lang="sass" scoped>
@import "~assets/sass/selectors"

.nav.nav-pills
  li.nav-item.line-break
    width: 100%
    height: 0
    margin: 0 0 0 0
</style>
