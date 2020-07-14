import { Assets } from "../../../assets"

const AssetImg = ({ thumbailUrl, type, name }) => {
    let thumbNailImg = thumbailUrl
    if (!thumbNailImg && type === 'video') thumbNailImg = Assets.videoThumbnail

    if (!thumbNailImg) thumbNailImg = Assets.empty
    return (
        <img src={thumbNailImg} alt={name} />
    )
}

export default AssetImg