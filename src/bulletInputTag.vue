<template>

  <div @click="focusNewTag()" v-bind:class="{'read-only': readOnly}" class="vue-input-tag-wrapper">
    <span v-for="(tag, index) in tags" v-bind:key="index" class="input-tag">
      <span>{{ tag }}</span>
      <a v-if="!readOnly" @click.prevent.stop="remove(index)" class="remove"></a>
    </span>
    <input v-if="!readOnly" v-bind:placeholder="placeholder" type="text" v-model="newTag" v-on:keydown.delete.stop="removeLastTag()" v-on:keydown.enter.188.tab.prevent.stop="addNew(newTag)" class="new-tag"/>
  </div>

</template>

<script>
  const validators = {
    email: new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    url : new RegExp(/^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i),
    text : new RegExp(/^[a-zA-Z]+$/),
    digits : new RegExp(/^[\d() \.\:\-\+#]+$/),
    isodate : new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/)
  }

  export default {
    name: 'bullet-input-tag',

    props: {
      tags: {
        type: Array,
        default: () => []
      },
      placeholder: {
        type: String,
        default: ''
      },
      onChange: {
        type: Function
      },
      slug: {
        type: Boolean,
        default: false
      },
      readOnly: {
        type: Boolean,
        default: false
      },
      validate: {
        type: String,
        default: ''
      }
    },

    data () {
      return {
        newTag: ''
      }
    },

    methods: {
      focusNewTag () {
        if (this.readOnly)
          { return }
        this.$el.querySelector('.new-tag').focus();
      },

      addNew (tag) {
        if (tag && this.tags.indexOf(tag) === -1 && this.validateIfNeeded(tag)) {
          if (this.slug)
            this.tags.push(this.slugify(tag));
          else
            this.tags.push(tag);
          this.tagChange()
        }
        this.newTag = ''
      },

      slugify (tagtoslug) {
        tagtoslug = tagtoslug.toLowerCase();
        tagtoslug = tagtoslug.replace(/[\u00C0-\u00C5]/ig,'a')
        tagtoslug = tagtoslug.replace(/[\u00C8-\u00CB]/ig,'e')
        tagtoslug = tagtoslug.replace(/[\u00CC-\u00CF]/ig,'i')
        tagtoslug = tagtoslug.replace(/[\u00D2-\u00D6]/ig,'o')
        tagtoslug = tagtoslug.replace(/[\u00D9-\u00DC]/ig,'u')
        tagtoslug = tagtoslug.replace(/[\u00D1]/ig,'n')
        tagtoslug = tagtoslug.replace(/[^a-z0-9 ]+/gi,'')
        tagtoslug = tagtoslug.trim().replace(/ /g,'-');
        tagtoslug = tagtoslug.replace(/[\-]{2}/g,'');
        return (tagtoslug.replace(/[^a-z\- ]*/gi,''));
      },

      validateIfNeeded (tagValue) {
        if (this.validate === '' || this.validate === undefined) {
          return true
        } else if (Object.keys(validators).indexOf(this.validate) > -1) {
          return validators[this.validate].test(tagValue)
        }
        return true
      },

      remove (index) {
        this.tags.splice(index, 1)
        this.tagChange()
      },

      removeLastTag () {
        if (this.newTag) { return }
        this.tags.pop()
        this.tagChange()
      },

      tagChange () {
        if (this.onChange) {
          // avoid passing the observer
          this.onChange(JSON.parse(JSON.stringify(this.tags)))
        }
      }
    }
  }
</script>

<style>

  .vue-input-tag-wrapper {
    background-color: #fff;
    border: 1px solid #dbdbdb;
    border-radius: 4px;
    overflow: hidden;
    padding-top: 6px;
    padding-left: 6px;
    cursor: text;
    text-align: left;
  }

.vue-input-tag-wrapper:hover {
  border: 1px solid #aaa;
}

  .vue-input-tag-wrapper .input-tag {
    background-color: #00d1b2;
    border-radius: 2px;
    border: 1px solid #00d1b2;
    color: #ffffff;
    display: inline-block;
    font-size: 14px;
    font-weight: 400;
    margin-right: 6px;
    margin-bottom: 6px;
    padding: 6px;
  }

  .vue-input-tag-wrapper .input-tag .remove {
    cursor: pointer;
    font-weight: bold;
    color: #638421;
  }

  .vue-input-tag-wrapper .input-tag .remove:hover {
    text-decoration: none;
  }

  .vue-input-tag-wrapper .input-tag .remove::before {
    content: " ✖";
  }

  .vue-input-tag-wrapper .new-tag {
    background: transparent;
    border: 0;
    color: #777;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 6px;
    margin-top: 1px;
    outline: none;
    padding: 4px;
    padding-left: 0;
    width: 80px;
  }

  .vue-input-tag-wrapper .new-tag::-moz-placeholder {
    color: #c1c1c1;
   }

   .vue-input-tag-wrapper .new-tag::-webkit-input-placeholder {
    color: #c1c1c1;
   }

  .vue-input-tag-wrapper.read-only {
    cursor: default;
  }

</style>