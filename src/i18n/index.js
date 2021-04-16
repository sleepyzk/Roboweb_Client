import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ElementLocale from 'element-ui/lib/locale'
import elementEnLocale from 'element-ui/lib/locale/lang/en'  // elementui 的英文语言包
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // elementui 的中文语言包
import enLocale from '../assets/language/en'
import zhLocale from '../assets/language/zh'

Vue.use(VueI18n)

const messages = {
    'zh': {  // 中文包
        ...zhLocale,
        ...elementZhLocale
    },
    'en': {  // 英文包
        ...enLocale,
        ...elementEnLocale
    }
}

const i18n = new VueI18n({
    locale: 'zh',
    messages,
})
ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
