import { useTranslations } from 'next-intl';

export default function HomePage() {
    const t = useTranslations('HomePage');

    console.log(t('title'));

    return (
        <div>
            <h1>{t('title')}</h1>
        </div>
    );
}
