const t=`import { useState } from 'react'
import { Tabs, TabContent } from '@/components/ui/tabs'

export default function TabsDemo() {
  const [activeTab, setActiveTab] = useState('account')

  return (
    <div className="w-full max-w-md border border-[var(--color-border)] rounded-xl p-6 bg-[var(--color-surface)]">
      <Tabs 
        activeTab={activeTab} 
        onChange={setActiveTab}
        tabs={[
          { id: 'account', label: 'Account' },
          { id: 'password', label: 'Password' },
          { id: 'settings', label: 'Settings' }
        ]}
      />
      
      <TabContent id="account" activeTab={activeTab}>
        <p className="text-sm text-[var(--color-text-muted)]">Make changes to your account here.</p>
      </TabContent>
      
      <TabContent id="password" activeTab={activeTab}>
        <p className="text-sm text-[var(--color-text-muted)]">Change your password here. After saving, you'll be logged out.</p>
      </TabContent>
      
      <TabContent id="settings" activeTab={activeTab}>
        <p className="text-sm text-[var(--color-text-muted)]">Manage your application settings and preferences.</p>
      </TabContent>
    </div>
  )
}
`;export{t as default};
