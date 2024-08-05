import { EclipseCard } from '../../components/EclipseCard'
import './styles.css'

export const Events: React.FC<{}> = () => {
  return(
    <div className="bg-image img-fluid">
        <div style={{ position: 'relative',minHeight: '100vh'}}>
          <EclipseCard></EclipseCard>
        </div>
    </div>

  )
}