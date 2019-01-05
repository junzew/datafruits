import Controller from '@ember/controller';
import QueryParams from 'ember-parachute';
import { computed } from '@ember/object';

export const PodcastQueryParams = new QueryParams({
  page: {
    defaultValue: 1,
    refresh: true
  },
  tags: {
    defaultValue: [],
    refresh: true,
    serialize(value) {
      return value.toString();
    },
    deserialize(value = '') {
      return value.split(',');
    }
  },
  query: {
    defaultValue: "",
    refresh: true
  }
});

export default Controller.extend(PodcastQueryParams.Mixin, {
  queryParamsChanged: computed.or('queryParamsState.{page,query,tags}.changed'),
  searchParams: computed('query', 'tags', function(){
    return { query: this.get('query'), tags: this.get('tags') };
  }),
  actions: {
    updateSearch(query, tags){
      console.log('updateSearch');
      this.set('query', query);
      this.set('tags', tags);
    }
  }
});
