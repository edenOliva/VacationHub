import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import RoleModel from "../../../Models/RoleModel";
import AdminLinks from "../AdminButtons/AdminLinks/AdminLinks";
import vacationsService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";
import "./Card.css"

interface CardProps {
    vacation: VacationModel;
}

function Card(props: CardProps): JSX.Element {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    const user = authStore.getState().user;

    useEffect(() => {
        // Fetch likes
        async function fetchLikes() {
            if (user?.userId) {
                try {
                    const likedVacations = await vacationsService.getLikesByUser(user.userId);
                    let isLiked = false;
                    likedVacations.forEach((v) => {
                        if (v.vacationId === props.vacation.vacationId) {
                            isLiked = true;
                        }
                    });
                    setIsFollowing(isLiked);
                } catch (err) {
                    notifyService.error(err);
                }
            }
        }

        fetchLikes();
    }, []);

    // Like / Unlike
    async function likeUnlike() {

        const vacationId = props.vacation.vacationId;

        if (isFollowing === true) {
            try {
                await vacationsService.unlike(user.userId, props.vacation)
                setIsFollowing(false);
                props.vacation.likes = props.vacation.likes - 1;
            }
            catch (err) {
                notifyService.error(err);
            }
        } else {
            try {
                await vacationsService.AddLike(user.userId, vacationId)
                setIsFollowing(true);
                props.vacation.likes = props.vacation.likes + 1;
            }

            catch (err) {
                notifyService.error(err);
            }
        }
    }

    const buttonStyle = isFollowing ? { backgroundColor: "LightPink" } : {};

    return (
        <div className="Card">
            <header style={{
                backgroundImage: `url(${props.vacation.imageUrl})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}>

                {user?.roleId === RoleModel.User ?
                    <button style={buttonStyle} onClick={likeUnlike} >&#x2661; {props.vacation.likes} likes</button>
                    : <AdminLinks vacationId={props.vacation.vacationId} />
                }

                <h2>{props.vacation.destination}</h2>
            </header>

            <div className="DateDiv">
               {new Date(props.vacation.startDate).toLocaleDateString()} - {new Date(props.vacation.endDate).toLocaleDateString()}
            </div>
            <p>
                <br />
                {props.vacation.description}
            </p>
            <div className="PriceDiv">
                ${props.vacation.price}
            </div>
        </div>
    );
}

export default Card;
