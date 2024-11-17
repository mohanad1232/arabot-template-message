<template>
  <!-- Container for entire template editor, conditionally apply RTL styling -->
  <v-container :class="{ 'rtl-container': isRTL }">
    <v-row class="full-width">
      <!-- Main form container -->
      <v-col cols="12" md="8">
        <!-- Template Details Card -->
        <v-card elevation="0">
          <v-card-title class="rtl">{{ $t('template_details') }}</v-card-title>
          <v-card-text>
            <v-text-field
              variant="outlined"
              :label="$t('template_name')"
              v-model="template.name"
              :rules="[rules.required]"
              maxlength="20"
            />
            <v-select
              variant="outlined"
              :items="languages"
              :label="$t('language')"
              v-model="template.language"
              item-text="title"
              item-value="value"
              :rules="[rules.required]"
              @change="handleLanguageChange"
            />
          </v-card-text>
        </v-card>

        <!-- Category Selection Card -->
        <v-card class="mt-4" elevation="0">
          <v-card-title>{{ $t('category_selection') }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="12">
                <v-card
                  class="category-card purple"
                  :class="{ 'selected-category': template.category === 'MARKETING' }"
                  @click="setCategory('MARKETING')"
                >
                  <v-card-title>
                    <v-icon large left>mdi-bullhorn</v-icon> {{ $t('marketing') }}
                  </v-card-title>
                  <v-card-subtitle>
                    {{ $t('marketing_description') }}
                  </v-card-subtitle>
                </v-card>
              </v-col>
              <v-col cols="12" md="12">
                <v-card
                  class="category-card purple-light"
                  :class="{ 'selected-category': template.category === 'UTILITY' }"
                  @click="setCategory('UTILITY')"
                >
                  <v-card-title>
                    <v-icon large left>mdi-bell</v-icon> {{ $t('utility') }}
                  </v-card-title>
                  <v-card-subtitle>
                    {{ $t('utility_description') }}
                  </v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Header Format Tabs -->
        <v-card class="mt-4" elevation="0">
          <v-tabs v-model="activeTab">
            <v-tab @click="setHeaderFormat('NONE')">
              <v-icon left>mdi-close</v-icon> {{ $t('none') }}
            </v-tab>
            <v-tab @click="setHeaderFormat('TEXT')">
              <v-icon left>mdi-format-text</v-icon> {{ $t('text') }}
            </v-tab>
            <v-tab @click="setHeaderFormat('IMAGE')">
              <v-icon left>mdi-image</v-icon> {{ $t('image') }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="activeTab">
            <v-tab-item v-if="template.header.format === 'TEXT'">
              <v-card-text>
                <v-text-field
                  variant="outlined"
                  :label="$t('header_text')"
                  v-model="template.header.value.text"
                />
              </v-card-text>
            </v-tab-item>
            <v-tab-item v-if="template.header.format === 'IMAGE'">
              <v-card-text>
                <div
                  class="drop-area"
                  @click="triggerFileInput"
                  @drop.prevent="onDrop"
                  @dragover.prevent
                >
                  <v-icon>mdi-upload</v-icon>
                  <span>{{ $t('drag_drop_image') }}</span>
                  <input type="file" ref="fileInput" @change="onImageUpload" style="display: none;" />
                  <div v-if="template.header.value.url" class="thumbnail-preview">
                    <img :src="template.header.value.url" alt="Header Thumbnail" />
                  </div>
                </div>
              </v-card-text>
            </v-tab-item>
          </v-tabs-items>
        </v-card>

        <!-- Body Text Card -->
        <v-card class="mt-4" elevation="0">
          <v-card-title>{{ $t('body') }}</v-card-title>
          <v-card-text>
            <v-textarea
              variant="outlined"
              :label="$t('body_text')"
              v-model="template.body.text"
              :rules="[rules.required]"
            />
          </v-card-text>
        </v-card>

        <!-- Footer Text Card -->
        <v-card class="mt-4" elevation="0">
          <v-card-title>{{ $t('footer') }}</v-card-title>
          <v-card-text>
            <v-text-field
              variant="outlined"
              :label="$t('footer_text')"
              v-model="template.footer.text"
            />
          </v-card-text>
        </v-card>

        <!-- Buttons Section -->
        <v-card class="mt-4" elevation="0">
          <v-card-title>{{ $t('buttons') }}</v-card-title>
          <v-card-text>
            <v-btn @click="addButton">{{ $t('add_button') }}</v-btn>
            <v-row v-for="(button, index) in template.buttons" :key="index" class="mt-2">
              <v-col cols="12" md="3">
                <v-select
                  variant="outlined"
                  :items="buttonTypes"
                  v-model="button.type"
                  :label="$t('button_type')"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  variant="outlined"
                  v-if="button.type === 'URL'"
                  v-model="button.value.url"
                  :label="$t('website_url')"
                  :rules="[rules.required, rules.validUrl]"
                />
                <v-text-field
                  variant="outlined"
                  v-if="button.type === 'CALL'"
                  v-model="button.value.phone_number"
                  :label="$t('phone_number')"
                  :rules="[rules.required, rules.validPhoneNumber]"
                />
              </v-col>
              <v-col cols="10" md="4">
                <v-text-field
                  variant="outlined"
                  v-model="button.text"
                  :label="$t('button_text')"
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="2" class="d-flex align-center justify-center">
                <v-btn icon color="red" @click="removeButton(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Preview Section -->
      <v-col cols="12" md="4">
        <v-card class="gray-bg" elevation="0">
          <v-card-title>{{ $t('preview') }}</v-card-title>
          <v-card-text>
            <div class="mobile-preview">
              <v-container class="mobile-preview-content">
                <v-row>
                  <v-col>
                    <div class="preview-header" v-if="template.header.format === 'TEXT'">
                      {{ template.header.value.text }}
                    </div>
                    <div class="preview-header" v-if="template.header.format === 'IMAGE'">
                      <img :src="template.header.value.url" alt="Header Image" />
                    </div>
                    <div class="preview-body">
                      {{ template.body.text }}
                    </div>
                    <div class="preview-footer" v-if="template.footer.text">
                      {{ template.footer.text }}
                    </div>
                    <div class="preview-buttons">
                      <v-btn
                        v-for="(button, index) in template.buttons"
                        :key="index"
                        @click="handleButtonClick(button)"
                      >
                        {{ button.text }}
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  data() {
    return {
      activeTab: 0, // Keeps track of the active tab for header format
      isRTL: false, // Sets RTL styling based on language selection
      languages: [
        { title: 'English (US)', value: 'en_US' },
        { title: 'Arabic (SA)', value: 'ar_SA' },
      ],
      buttonTypes: ['URL', 'CALL'], // Button types for adding buttons
      rules: {
        // Validation rules for form inputs
        required: (value) => !!value || this.$t('required'),
        validUrl: (value) => {
          try {
            new URL(value);
            return true;
          } catch (e) {
            return this.$t('invalid_url');
          }
        },
        validPhoneNumber: (value) => {
          const phoneRegex = /^\+?\d{10,15}$/;
          return phoneRegex.test(value) || this.$t('invalid_phone_number');
        },
      },
      template: {
        // Template object for storing form values
        name: '',
        language: 'en_US',
        category: '',
        header: {
          format: 'NONE',
          value: {
            text: '',
            url: '',
          },
        },
        body: {
          text: '',
        },
        footer: {
          text: '',
        },
        buttons: [],
      },
    };
  },
  watch: {
    // Watch for language change to adjust RTL styling
    'template.language': function (newLanguage) {
      this.handleLanguageChange(newLanguage);
    },
  },
  methods: {
    // Method to set header format
    setHeaderFormat(format) {
      this.template.header.format = format;
    },
    // Method to set category
    setCategory(category) {
      this.template.category = category;
    },
    // Method to add a new button to the template
    addButton() {
      this.template.buttons.push({
        type: 'URL',
        text: '',
        value: {
          url: '',
          phone_number: '',
        },
      });
    },
    // Method to remove a button from the template
    removeButton(index) {
      this.template.buttons.splice(index, 1);
    },
    // Handle image upload from file input
    onImageUpload(e) {
      const file = e.target.files[0];
      if (file) {
        this.template.header.value.url = URL.createObjectURL(file);
      }
    },
    // Handle image drop upload
    onDrop(e) {
      const file = e.dataTransfer.files[0];
      if (file) {
        this.template.header.value.url = URL.createObjectURL(file);
      }
    },
    // Trigger file input for image upload
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    // Handle language change and apply RTL if necessary
    handleLanguageChange(language) {
      this.isRTL = language === 'ar_SA';
      this.$i18n.locale = language;
    },
    // Handle button click for URL or call actions
    handleButtonClick(button) {
      if (button.type === 'URL' && button.value.url) {
        window.open(button.value.url, '_blank');
      } else if (button.type === 'CALL' && button.value.phone_number) {
        window.location.href = `tel:${button.value.phone_number}`;
      }
    },
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
};
</script>

<style scoped>
/* RTL container styling */
.rtl-container {
  direction: rtl;
}
/* Styling for preview header section */
.preview-header {
  font-weight: bold;
  margin-bottom: 10px;
}
.preview-header img {
  width: 100%;
}
/* Styling for preview body section */
.preview-body {
  margin-bottom: 10px;
}
/* Styling for preview footer section */
.preview-footer {
  font-style: italic;
  margin-top: 10px;
}
/* Styling for buttons in preview */
.preview-buttons v-btn {
  margin-right: 5px;
}
/* Drop area styling for image upload */
.drop-area {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s ease;
}
.drop-area:hover {
  background-color: #f5f5f5;
}
/* Styling for image thumbnail preview */
.thumbnail-preview {
  margin-top: 10px;
  text-align: center;
}
.thumbnail-preview img {
  max-width: 100px;
  max-height: 100px;
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 5px;
}
/* Styling for mobile preview section */
.mobile-preview {
  background-image: url('@/assets/Preview.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  max-width: 333px;
  height: 620px;
  min-height: 567px;
  padding: 70px 20px;
  margin: 0 auto;
  position: relative;
}
.full-width {
  max-width: 1440px;
  margin: auto;
}
/* Styling for mobile preview content */
.mobile-preview-content {
  max-height: 407px;
  overflow: hidden;
  margin-top: 56px;
  padding: 8px 15px 9px 13px;
  background: white;
  width: 256px;
  float: left;
  margin-left: 8px;
}
/* Category card styling */
.purple {
  background: #e4e5ef;
}
.purple-light {
  background: #edf2f7;
}
/* Button styling in mobile preview */
.mobile-preview button {
  width: 100%;
  box-shadow: none;
  color: blue;
}
/* Styling for selected category */
.selected-category {
  border: 2px solid black;
}
/* Background color for gray cards */
.gray-bg {
  background-color: #F8F9FA;
}
</style>
