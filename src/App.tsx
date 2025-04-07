
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from '@/components/layout/Layout'
import Index from '@/pages/Index'
import Dashboard from '@/pages/Dashboard'
import Calendar from '@/pages/Calendar'
import Campaigns from '@/pages/Campaigns'
import Analytics from '@/pages/Analytics'
import Content from '@/pages/Content'
import BrandIntelligence from '@/pages/BrandIntelligence'
import MarketIntelligence from '@/pages/MarketIntelligence'
import Messages from '@/pages/Messages'
import Approvals from '@/pages/Approvals'
import Team from '@/pages/Team'
import Settings from '@/pages/Settings'
import NotFound from '@/pages/NotFound'
import Auth from '@/pages/Auth'
import EmailConfirmation from '@/pages/EmailConfirmation'
import ForgotPassword from '@/pages/ForgotPassword'
import { Toaster } from '@/components/ui/toaster'
import { Navigate } from 'react-router-dom'
import BrandReputationReport from '@/pages/BrandReputationReport'
import BSADashboard from '@/pages/BSADashboard'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Marketing Section */}
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/content" element={<Content />} />
          <Route path="/approvals" element={<Approvals />} />
          
          {/* Insights Section */}
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/brand-intelligence" element={<BrandIntelligence />} />
          <Route path="/market-intelligence" element={<MarketIntelligence />} />
          <Route path="/BRR-Q125-MCR" element={<BrandReputationReport />} />
          <Route path="/bsa-dashboard" element={<BSADashboard />} />
          
          {/* Standalone - Unified Social Inbox */}
          <Route path="/messages" element={<Messages />} />
          
          {/* Settings and Team Pages */}
          <Route path="/settings" element={<Settings />} />
          <Route path="/team" element={<Team />} />
          
          {/* Authentication Pages */}
          <Route path="/login" element={<Navigate to="/auth" replace />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/email-confirmation" element={<EmailConfirmation />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </AuthProvider>
  )
}

export default App
