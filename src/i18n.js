// this is for multi language - you can add more words depending on your needs

import { createI18n } from 'vue-i18n';

const messages = {
  en_US: {
    toggle_rtl_mode: 'Toggle RTL Mode',
    template_details: 'Template Details',
    template_name: 'Template Name',
    language: 'Language',
    category_selection: 'Category Selection',
    marketing: 'Marketing',
    marketing_description: 'Send promotions and information about your products, services, or business.',
    utility: 'Utility',
    utility_description: 'Send messages about an existing order or account.',
    none: 'None',
    text: 'Text',
    image: 'Image',
    header_text: 'Header Text',
    drag_drop_image: 'Drag & Drop Image Here or Click to Upload',
    upload_image: 'Upload Image',
    body: 'Body',
    body_text: 'Body Text',
    footer: 'Footer',
    footer_text: 'Footer Text',
    buttons: 'Buttons',
    add_button: 'Add Button',
    button_type: 'Button Type',
    website_url: 'Website URL',
    phone_number: 'Phone Number',
    button_text: 'Button Text',
    preview: 'Preview',
    required: 'Required.',
    invalid_url: 'Invalid URL.',
    invalid_phone_number: 'Invalid phone number.',
  },
  ar_SA: {
    toggle_rtl_mode: 'تغيير الاتجاه إلى اليمين',
    template_details: 'تفاصيل القالب',
    template_name: 'اسم القالب',
    language: 'اللغة',
    category_selection: 'اختيار الفئة',
    marketing: 'تسويق',
    marketing_description: 'أرسل العروض الترويجية والمعلومات حول منتجاتك أو خدماتك أو نشاطك التجاري.',
    utility: 'فوائد',
    utility_description: 'أرسل رسائل حول طلب قائم أو حساب.',
    none: 'بدون',
    text: 'نص',
    image: 'صورة',
    header_text: 'نص الرأس',
    drag_drop_image: 'اسحب وأفلت الصورة هنا أو انقر لتحميلها',
    upload_image: 'تحميل صورة',
    body: 'المتن',
    body_text: 'نص المتن',
    footer: 'التذييل',
    footer_text: 'نص التذييل',
    buttons: 'الأزرار',
    add_button: 'إضافة زر',
    button_type: 'نوع الزر',
    website_url: 'رابط الموقع',
    phone_number: 'رقم الهاتف',
    button_text: 'نص الزر',
    preview: 'معاينة',
    required: 'مطلوب.',
    invalid_url: 'رابط غير صحيح.',
    invalid_phone_number: 'رقم هاتف غير صحيح.',
  },
};

const i18n = createI18n({
  locale: 'en_US',
  fallbackLocale: 'en_US',
  messages,
});

export default i18n;