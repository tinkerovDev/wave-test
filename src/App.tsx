import { useEffect, useState } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import type { RootState } from './store'
import { SearchBar } from './components/SearchBar/SearchBar'
import { CategorySelect } from './components/CategorySelect/CategorySelect'
import { ItemsList } from './components/ItemsList/ItemsList'
import { Modal } from './components/Modal/Modal'
import { CloseButton } from './components/CloseButton/CloseButton'
import { t } from './i18n'

function App() {
  const total = useSelector((s: RootState) => s.items.items.length)
  const accent = useSelector((s: RootState) => (s as any).theme.accent)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<any>(null)

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent)
  }, [accent])

  return (
    <div className="w-full max-w-3xl mx-auto" style={{ width:737, height:634, minWidth:737, maxWidth:737, minHeight:634, maxHeight:634, background:'#0d0d0d', border:'1px solid #374151', borderRadius:12, overflow:'hidden', boxSizing:'border-box' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:16, background:'#0d0d0d' }}>
        <div style={{ display:'flex', gap:8, alignItems:'center' }}>
          <div style={{ width:20, height:20 }}>
            <img src="/items/icon.png" alt="" style={{ width:'100%', height:'100%', objectFit:'cover', borderRadius:4 }} />
          </div>
          <h1 style={{ color:'#fff', fontWeight:600, fontSize:18 }}>{t('app.title')}</h1>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ color:'#d1d5db', fontSize:14 }}>{t('app.total')}: <b style={{ color:'#fff' }}>{total}</b></span>
          <CloseButton onClick={() => setOpen(false)} />
        </div>
      </div>
      <div style={{ padding:'16px 20px 16px 16px', background:'#0d0d0d', display:'grid', gap:10, gridTemplateColumns:'1fr auto' }}>
        <SearchBar />
        <CategorySelect />
      </div>
      <ItemsList onItemClick={(i) => { setSelected(i); setOpen(true); }} />
      <Modal item={selected} open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default App
