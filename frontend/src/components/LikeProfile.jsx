import toast from "react-hot-toast"
import { FaHeart } from "react-icons/fa"


const LikeProfile = ({ userProfile }) => {
  const handleLikeProfile = async () => {
    try {

    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <button className="p-2 text-xs w-full font-medium rounded-md bg-glass border border-blue-400 flex items-center gap-2"
      onClick={handleLikeProfile}
    >
      <FaHeart size={16} /> Like Profile
    </button>
  )
}

export default LikeProfile