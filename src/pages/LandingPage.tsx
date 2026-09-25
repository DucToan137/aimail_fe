import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  Mail, 
  ArrowUpRight, 
  Search, 
  Clock, 
  Check, 
  Sparkles, 
  Shield, 
  CircleDot, 
  Layers, 
  ChevronRight
} from 'lucide-react';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { LanguageToggle } from '../components/ui/LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';

export const LandingPage: React.FC = () => {
  const { isAuthenticated, redirectToGoogle } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'board' | 'summary' | 'search'>('board');

  const handleGoogleLogin = () => {
    const state = Math.random().toString(36).substring(2, 15);
    redirectToGoogle(state);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased selection:bg-zinc-900 dark:selection:bg-zinc-100 selection:text-white dark:selection:text-zinc-950 transition-colors duration-200">
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#fafafa]/85 dark:bg-zinc-950/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo with Color Accent */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-md bg-zinc-950 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-950 shadow-xs group-hover:scale-95 transition-transform duration-150">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-zinc-950 dark:text-zinc-100">
              AIEmail
            </span>
            <span className="text-[10px] font-mono tracking-wider px-1.5 py-0.2 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/60 font-medium">
              v1.0
            </span>
          </Link>

          {/* Center Links (Enlarged text-sm) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <a href="#product" className="hover:text-zinc-950 dark:hover:text-white transition-colors">{t('landing.nav.workspace')}</a>
            <a href="#features" className="hover:text-zinc-950 dark:hover:text-white transition-colors">{t('landing.nav.workflow')}</a>
            <a href="#security" className="hover:text-zinc-950 dark:hover:text-white transition-colors">{t('landing.nav.security')}</a>
          </nav>

          {/* Action */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Language Toggle Dropdown */}
            <LanguageToggle variant="dropdown" />

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {isAuthenticated ? (
              <Link
                to="/inbox"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-medium hover:bg-zinc-800 dark:hover:bg-white transition-colors shadow-xs ml-1"
              >
                {t('landing.nav.enterInbox')}
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600" />
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors px-2 py-1 cursor-pointer bg-transparent border-0"
                >
                  {t('landing.nav.login')}
                </button>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-medium hover:bg-zinc-800 dark:hover:bg-white transition-colors shadow-xs cursor-pointer ml-1"
                >
                  {t('landing.nav.connectGmail')}
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* 2. Hero Section: Clean Monochrome with Subtle Depth */}
        <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 px-6 text-center max-w-4xl mx-auto overflow-hidden">
          {/* Very subtle ambient light behind headline for depth */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-gradient-to-tr from-blue-100/40 via-violet-100/30 to-emerald-100/40 dark:from-blue-900/20 dark:via-violet-900/15 dark:to-emerald-900/20 blur-[90px] pointer-events-none rounded-full" />

          {/* Tagline Badge with Color Sparkle */}
          <div className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200/90 dark:border-zinc-800 shadow-2xs mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-zinc-800 dark:text-zinc-200 font-medium">Gmail</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Kanban Workflow</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="text-amber-600 dark:text-amber-400 font-medium">Gemini AI</span>
          </div>

          {/* Main Statement */}
          <h1 className="relative text-4xl sm:text-6xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.12]">
            {t('landing.hero.titleLine1')}
            <br />
            {t('landing.hero.titleLine2')}
          </h1>

          <p className="relative mt-6 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
            {t('landing.hero.description')}
          </p>

          {/* Action CTAs */}
          <div className="relative mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/inbox"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 text-sm font-medium transition-all shadow-xs group"
              >
                <span>{t('landing.hero.enterInboxBtn')}</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 dark:text-zinc-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 text-sm font-medium transition-all shadow-xs group cursor-pointer"
              >
                <span>{t('landing.hero.startWithGmailBtn')}</span>
                <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-zinc-800 dark:bg-zinc-200 text-zinc-300 dark:text-zinc-700 rounded border border-zinc-700 dark:border-zinc-300 group-hover:border-zinc-600">
                  G
                </kbd>
              </button>
            )}
            <a
              href="#product"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-md bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 text-sm font-medium border border-zinc-200 dark:border-zinc-800 transition-colors shadow-2xs"
            >
              {t('landing.hero.viewWorkspaceBtn')}
            </a>
          </div>

          {/* Neutral Micro Trust Cues with Colorful Icons */}
          <div className="relative mt-9 flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-blue-600" />
              {t('landing.hero.trust1')}
            </span>
            <span className="text-zinc-300">•</span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              {t('landing.hero.trust2')}
            </span>
            <span className="text-zinc-300">•</span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-violet-600" />
              {t('landing.hero.trust3')}
            </span>
          </div>
        </section>

        {/* 3. The Product Workspace Canvas (OS-Neutral + Colorful Highlights) */}
        <section id="product" className="max-w-6xl mx-auto px-6 mb-24">
          <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-200/60 dark:shadow-none overflow-hidden">
            {/* Flat OS-Neutral Header */}
            <div className="h-11 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200/80 dark:border-zinc-800 px-4 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              {/* Neutral Brand & Location Tag */}
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[11px] text-zinc-800 dark:text-zinc-200 font-semibold tracking-wide">AIEmail Workspace</span>
                <span className="text-zinc-300 dark:text-zinc-700">/</span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">inbox.kanban</span>
              </div>

              {/* Neutral Command Bar without ⌘K */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 text-zinc-500 text-xs w-72 shadow-2xs">
                <Search className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                <span className="font-normal text-[11px] text-zinc-400 dark:text-zinc-400">{t('landing.workspace.searchPlaceholder')}</span>
              </div>

              {/* View Selector Tabs with Colored Active States */}
              <div className="flex items-center rounded-md bg-zinc-100 dark:bg-zinc-800 p-0.5 border border-zinc-200 dark:border-zinc-700/80">
                <button 
                  onClick={() => setActiveTab('board')}
                  className={`px-2.5 py-0.5 text-[11px] font-medium rounded transition-all ${activeTab === 'board' ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-100 shadow-2xs font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'}`}
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5" />
                  {t('landing.workspace.tabKanban')}
                </button>
                <button 
                  onClick={() => setActiveTab('summary')}
                  className={`px-2.5 py-0.5 text-[11px] font-medium rounded transition-all ${activeTab === 'summary' ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-100 shadow-2xs font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'}`}
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5" />
                  {t('landing.workspace.tabSummary')}
                </button>
                <button 
                  onClick={() => setActiveTab('search')}
                  className={`px-2.5 py-0.5 text-[11px] font-medium rounded transition-all ${activeTab === 'search' ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-100 shadow-2xs font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'}`}
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-500 mr-1.5" />
                  {t('landing.workspace.tabSearch')}
                </button>
              </div>
            </div>

            {/* Workspace Canvas */}
            <div className="p-6 bg-[#fafafa] dark:bg-zinc-950 min-h-[420px]">
              {activeTab === 'board' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Column 1: Inbox */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400 pb-1 border-b border-zinc-200 dark:border-zinc-800">
                      <span className="flex items-center gap-1.5 font-medium text-zinc-800 dark:text-zinc-200">
                        <CircleDot className="w-3.5 h-3.5 text-blue-500" />
                        {t('landing.workspace.inboxColumn')}
                      </span>
                      <span className="text-[11px] bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60 px-1.5 py-0.2 rounded font-medium">{t('landing.workspace.inboxCount')}</span>
                    </div>

                    {/* Card 1 */}
                    <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xs transition-all cursor-pointer">
                      <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 mb-1.5">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">{t('landing.workspace.card1Sender')}</span>
                        <span className="font-mono text-[10px]">10:42 AM</span>
                      </div>
                      <p className="text-xs font-medium text-zinc-900 dark:text-zinc-200 leading-snug">{t('landing.workspace.card1Subject')}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/60 font-medium">
                          DevOps
                        </span>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">{t('landing.workspace.card1Action')}</span>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xs transition-all cursor-pointer">
                      <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 mb-1.5">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">{t('landing.workspace.card2Sender')}</span>
                        <span className="font-mono text-[10px]">08:15 AM</span>
                      </div>
                      <p className="text-xs font-medium text-zinc-900 dark:text-zinc-200 leading-snug">{t('landing.workspace.card2Subject')}</p>
                      <div className="mt-3 flex items-center gap-1.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/60 font-medium">
                          {t('landing.workspace.card2Tag')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: In Progress */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400 pb-1 border-b border-zinc-200 dark:border-zinc-800">
                      <span className="flex items-center gap-1.5 font-medium text-zinc-900 dark:text-zinc-100">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        {t('landing.workspace.inProgressColumn')}
                      </span>
                      <span className="text-[11px] bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60 px-1.5 py-0.2 rounded font-medium">{t('landing.workspace.inProgressCount')}</span>
                    </div>

                    {/* Active working Card with Warm Amber/Gold Border */}
                    <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-zinc-100 shadow-sm cursor-pointer">
                      <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 mb-1.5">
                        <span className="font-semibold text-zinc-950 dark:text-zinc-50">{t('landing.workspace.card3Sender')}</span>
                        <span className="font-mono text-[10px] text-amber-700 dark:text-amber-400 font-semibold bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 px-1.5 py-0.2 rounded">{t('landing.workspace.card3Date')}</span>
                      </div>
                      <p className="text-xs font-semibold text-zinc-950 dark:text-zinc-100 leading-snug">{t('landing.workspace.card3Subject')}</p>
                      
                      {/* Integrated AI snippet inside task with Accent Box */}
                      <div className="mt-3 pt-2.5 border-t border-zinc-100 dark:border-zinc-800 text-[11px]">
                        <div className="flex items-center gap-1 text-amber-800 dark:text-amber-400 font-semibold text-[11px] mb-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span>{t('landing.workspace.card3AiTitle')}</span>
                        </div>
                        <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                          {t('landing.workspace.card3AiBullet1')}<br/>
                          {t('landing.workspace.card3AiBullet2')}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                        <span>{t('landing.workspace.card3Messages')}</span>
                        <span className="text-amber-700 dark:text-amber-400 font-medium">{t('landing.workspace.card3Priority')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Done */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400 pb-1 border-b border-zinc-200 dark:border-zinc-800">
                      <span className="flex items-center gap-1.5 font-medium text-zinc-800 dark:text-zinc-200">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        {t('landing.workspace.doneColumn')}
                      </span>
                      <span className="text-[11px] bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 px-1.5 py-0.2 rounded font-medium">{t('landing.workspace.doneCount')}</span>
                    </div>

                    {/* Completed items with green accents */}
                    <div className="p-3 rounded-lg bg-zinc-100/70 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors">
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <span>{t('landing.workspace.card4Sender')}</span>
                        <span>{t('landing.workspace.card4Date')}</span>
                      </div>
                      <p className="text-xs line-through text-zinc-500 dark:text-zinc-500 font-medium">{t('landing.workspace.card4Subject')}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-zinc-100/70 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors">
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <span>{t('landing.workspace.card5Sender')}</span>
                        <span>{t('landing.workspace.card5Date')}</span>
                      </div>
                      <p className="text-xs line-through text-zinc-500 font-medium">{t('landing.workspace.card5Subject')}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'summary' && (
                <div className="max-w-2xl mx-auto p-6 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
                  <div className="flex items-start justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-4">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{t('landing.workspace.summaryEmailNum')}</span>
                      <h4 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50 mt-0.5">{t('landing.workspace.summarySubject')}</h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{t('landing.workspace.summaryFrom')}</p>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                      Gemini 2.5 Flash
                    </span>
                  </div>

                  <div className="space-y-3 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {t('landing.workspace.summaryTldrTitle')}
                    </p>
                    <p className="bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded border border-zinc-200 dark:border-zinc-800 font-mono text-zinc-800 dark:text-zinc-200 text-[11px]">
                      {t('landing.workspace.summaryTldrText')}
                    </p>

                    <p className="font-semibold text-zinc-900 dark:text-zinc-100 pt-2">{t('landing.workspace.summaryActionsTitle')}</p>
                    <ul className="space-y-1.5 pl-4 list-disc text-zinc-600 dark:text-zinc-400 text-xs">
                      <li>{t('landing.workspace.summaryAction1')}</li>
                      <li>{t('landing.workspace.summaryAction2')}</li>
                      <li>{t('landing.workspace.summaryAction3')}</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'search' && (
                <div className="max-w-2xl mx-auto space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-300 dark:border-zinc-700 shadow-2xs">
                    <Search className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                    <input 
                      type="text" 
                      readOnly 
                      value={t('landing.workspace.searchQuery')} 
                      className="w-full text-xs font-sans text-zinc-900 dark:text-zinc-100 bg-transparent outline-none"
                    />
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 font-medium">
                      Vector L2 Match (pgvector)
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 dark:text-zinc-400 mb-1">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">{t('landing.workspace.searchItem1Sender')}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-mono font-medium">{t('landing.workspace.searchItem1Score')}</span>
                      </div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-200">{t('landing.workspace.searchItem1Subject')}</p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">{t('landing.workspace.searchItem1Snippet')}</p>
                    </div>

                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 dark:text-zinc-400 mb-1">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">{t('landing.workspace.searchItem2Sender')}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-mono font-medium">{t('landing.workspace.searchItem2Score')}</span>
                      </div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-200">{t('landing.workspace.searchItem2Subject')}</p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">{t('landing.workspace.searchItem2Snippet')}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Keyboard Bar with Color Badges */}
            <div className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 px-6 py-2.5 flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-5">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-[10px] shadow-2xs font-semibold">E</kbd>
                  <span className="text-zinc-700 dark:text-zinc-300">{t('landing.workspace.shortcutArchive')}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-[10px] shadow-2xs font-semibold">S</kbd>
                  <span className="text-zinc-700 dark:text-zinc-300">{t('landing.workspace.shortcutSnooze')}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-[10px] shadow-2xs font-semibold">/</kbd>
                  <span className="text-zinc-700 dark:text-zinc-300">{t('landing.workspace.shortcutSearch')}</span>
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Reactive Non-blocking Engine</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Bento Grid (Linear Style + Colorful Feature Accents) */}
        <section id="features" className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-200/80 dark:border-zinc-800">
          <div className="mb-12 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">{t('landing.features.philosophyBadge')}</span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mt-1.5">
              {t('landing.features.bentoTitle')}
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2.5 leading-relaxed">
              {t('landing.features.bentoDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Bento Block 1: Kanban Pipeline (Blue Accent) */}
            <div className="md:col-span-2 p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <div>
                <div className="w-8 h-8 rounded-md bg-blue-50 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">{t('landing.features.f1Title')}</h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed max-w-lg">
                  {t('landing.features.f1Desc')}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <span className="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {t('landing.features.f1Badge')}
                </span>
                <span>•</span>
                <span>Zero message loss</span>
              </div>
            </div>

            {/* Bento Block 2: Gemini Intelligence (Amber Accent) */}
            <div className="p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <div>
                <div className="w-8 h-8 rounded-md bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">{t('landing.features.f2Title')}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                  {t('landing.features.f2Desc')}
                </p>
              </div>

              <div className="mt-6 p-3 rounded bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/60 font-mono text-[11px] text-amber-900 dark:text-amber-300">
                <span>{t('landing.features.f2Quote')}</span>
              </div>
            </div>

            {/* Bento Block 3: Vector Semantic Search (Violet Accent) */}
            <div className="p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <div>
                <div className="w-8 h-8 rounded-md bg-violet-50 dark:bg-violet-950/50 border border-violet-200/80 dark:border-violet-800/60 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-4">
                  <Search className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">{t('landing.features.f3Title')}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                  {t('landing.features.f3Desc')}
                </p>
              </div>

              <div className="mt-6 text-[11px] font-mono text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                <span>PostgreSQL + pgvector powered</span>
              </div>
            </div>

            {/* Bento Block 4: Smart Snooze (Emerald Accent) */}
            <div className="md:col-span-2 p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <div>
                <div className="w-8 h-8 rounded-md bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">{t('landing.features.f4Title')}</h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed max-w-lg">
                  {t('landing.features.f4Desc')}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-6 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">{t('landing.features.f4SnoozeTime')}</span>
                <span>•</span>
                <span>{t('landing.features.f4Worker')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Security & Trust Protocol */}
        <section id="security" className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-200/80">
          <div className="p-8 rounded-xl bg-zinc-950 text-zinc-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
                <Shield className="w-3.5 h-3.5" />
                <span>{t('landing.security.badge')}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                {t('landing.security.title')}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                {t('landing.security.description')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {isAuthenticated ? (
                <Link
                  to="/inbox"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-white text-zinc-950 text-xs font-semibold hover:bg-zinc-100 transition-colors shadow-xs"
                >
                  <span>{t('landing.security.openInbox')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-white text-zinc-950 text-xs font-semibold hover:bg-zinc-100 transition-colors shadow-xs cursor-pointer"
                >
                  <span>{t('landing.security.openWithGoogle')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* 6. Neutral Editorial Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400 text-xs transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-zinc-100 dark:border-zinc-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded bg-zinc-950 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-950">
                <Mail className="w-3 h-3" />
              </div>
              <span className="font-semibold text-zinc-950 dark:text-zinc-100 tracking-tight">AIEmail</span>
              <span className="text-zinc-400 dark:text-zinc-500 font-mono text-[11px]">{t('landing.footer.tagline')}</span>
            </div>

            <div className="flex items-center gap-6 text-zinc-600 dark:text-zinc-400 text-xs">
              <a href="#product" className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors">{t('landing.nav.workspace')}</a>
              <a href="#features" className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors">{t('landing.nav.features')}</a>
              <a href="#security" className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors">{t('landing.nav.security')}</a>
              {isAuthenticated ? (
                <Link to="/inbox" className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors">{t('landing.nav.enterInbox')}</Link>
              ) : (
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors cursor-pointer bg-transparent border-0 p-0 text-xs font-normal text-zinc-600 dark:text-zinc-400"
                >
                  {t('landing.nav.login')}
                </button>
              )}
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-zinc-400 dark:text-zinc-500">
            <p>© {new Date().getFullYear()} {t('landing.footer.copyright')}</p>
            <div className="flex items-center gap-4">
              <span className="text-zinc-600 dark:text-zinc-400">{t('landing.footer.googleCompliance')}</span>
              <span>•</span>
              <span className="text-zinc-600 dark:text-zinc-400">{t('landing.footer.aesEncryption')}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
