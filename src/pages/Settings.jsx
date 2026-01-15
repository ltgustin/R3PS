import PreferencesPanel from "@/components/preferences/preferences-panel";
import PageWrapper from '@/components/layout/page-wrapper'
import { Settings } from 'lucide-react'

function SettingsPage() {
    return (
        <PageWrapper
            title="Settings"
            icon={Settings}
            subtitle="Configure your preferences"
        >
            <PreferencesPanel />
        </PageWrapper>
    );
}

export default SettingsPage;