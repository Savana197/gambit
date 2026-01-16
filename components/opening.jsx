import { verifySession } from '@/lib/auth';
import classes from './opening.module.css'
import OpeningModal from './openings-modal'
import { getOpenings } from '@/lib/openings'

export default async function Opening() {
    const openings = await getOpenings();
    const userId = await verifySession();
    return (
        <div className="m-3">
            {userId ? 
            <div className="m-3">
                <OpeningModal userId={userId}></OpeningModal>
            </div> :
            null
            }
            
            {openings.map((o) => (
                <div className="card m-3" style={{ maxWidth: "1080px" }} key={o.id} >
                    <div className="row g-0">

                        <div className="col-md-4">
                            <img src={o.image} className="img-fluid rounded-start" alt="french-defense" />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{o.title}</h5>
                                <p className={`card-text ${classes.truncate}`}>{o.description}</p>
                                <p className="card-text"><small className="text-body-secondary">Created by {o.username}</small></p>
                            </div>
                        </div>
                    </div>

                </div>
            ))}

        </div>


    )
}