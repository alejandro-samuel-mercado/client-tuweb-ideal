import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
 
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  
  if (!locale || !['es', 'en'].includes(locale)) {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;
    locale = cookieLocale && ['es', 'en'].includes(cookieLocale) ? cookieLocale : 'es';
  }
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
