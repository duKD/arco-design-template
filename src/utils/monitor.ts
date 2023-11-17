import { App, ComponentPublicInstance } from "vue";

export default function handleError(Vue: App, baseUrl: string) {
  if (!baseUrl) {
    return;
  }
  Vue.config.errorHandler = (
    err: unknown,
    instance: ComponentPublicInstance | null,
    info: string
  ) => {
    console.error(err, instance, info);
    // send error info
    // axios.post(`${baseUrl}/report-error`, {
    //   err,
    //   instance,
    //   info,
    //   // location: window.location.href,
    //   // message: err.message,
    //   // stack: err.stack,
    //   // browserInfo: getBrowserInfo(),
    //   // user info
    //   // dom info
    //   // url info
    //   // ...
    // });
  };
}
