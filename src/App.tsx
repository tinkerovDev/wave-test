import { useEffect, useState } from 'react'
import './App.css'
import styles from './App.module.css'
import { asset } from './utils/assets'
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
    <div className={styles.container}>
      <div className={styles.headerBar}>
        <div className={styles.headerLeft}>
          <div className={styles.appIcon}>
            <img src={asset('items/icon.png')} alt="" />
          </div>
          <h1 className={styles.title}>{t('app.title')}</h1>
        </div>
        <div className={styles.rightControls}>
          <span style={{ color:'#808080', fontSize:14 }}>{t('app.total')}: <b style={{ color:'#fff' }}>{total}</b></span>
          <CloseButton onClick={() => setOpen(false)} />
        </div>
      </div>
      <div className={styles.toolbar}>
        <SearchBar />
        <CategorySelect />
      </div>
      <ItemsList onItemClick={(i) => { setSelected(i); setOpen(true); }} />
      <Modal item={selected} open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export default App
