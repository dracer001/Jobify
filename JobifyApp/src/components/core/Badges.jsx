
import PropTypes from 'prop-types';

// Define size classes for small, medium, and large badges
const sizeClasses = {
  sm: 'text-xs py-1.5 px-2 font-medium',   // Small: Smaller text and padding
  md: 'text-xs py-1.5 px-3 font-semibold', // Medium: Default size for medium badge
  lg: 'text-md py-2 px-4 font-semibold',   // Large: Larger text and padding
};


const Badge = ({ size = 'md', color = 'blue', theme = 'light', children }) => {


  // Determine the size class
  const sizeClass = sizeClasses[size] || sizeClasses['md']; // Default to 'md' if no size is passed

  // Set the badge background color based on the color prop
  const lightColorClass = `bg-${color}-50 text-${color}-700 ring-${color}-700/10 ring-1 ring-inset`;
  const meduimColorClass = `bg-${color}-200 text-${color}-800 `;
  const thickColorClass = `bg-${color}-600 text-white `;

  const themeClass = {
    light: lightColorClass,
    medium: meduimColorClass,
    thick: thickColorClass
  }
  const colorClass = themeClass[theme] || themeClass['light']

  return (
    <span className={`inline-flex items-center justify-center ${sizeClass} ${colorClass}  rounded-full `}>
      {children}
    </span>
  );
};







const BadgeStatus = ({status="default", theme="light", size="md"})=>{

  const Badges = {
    pending: <Badge size={size} theme={theme} color="yellow"> pending </Badge>,
    in_progress: <Badge size={size} theme={theme} color="blue"> in progress </Badge>,
    completed: <Badge size={size} theme={theme} color="green"> completed </Badge>,
    accepted: <Badge size={size} theme={theme} color="green"> accepted </Badge>,
    cancelled: <Badge size={size} theme={theme} color="red"> cancelled </Badge>,
    declined: <Badge size={size} theme={theme} color="red"> declined </Badge>,
    terminated: <Badge size={size} theme={theme} color="red"> terminated </Badge>,
    default: <Badge size={size} theme={theme} color="gray"> inactive </Badge> ,
  }

  return(
    Badges[status]
  )
}


// Prop types validation
BadgeStatus.propTypes = {
  status: PropTypes.oneOf(['pending', 'in_progress', 'completed', 'cancelled', 'terminated', 'default']),
};

// Prop types validation
Badge.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  theme: PropTypes.oneOf(['light', 'medium', 'thick']),
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
};


export default Badge;
export {
  BadgeStatus
}
// <div
// className={`${
//   job.status === 'In Progress'
//     ? 'bg-yellow-200 text-yellow-800'
//     : job.status === 'Completed'
//     ? 'bg-green- text-green-800'
//     : 'bg-gray-200 text-gray-800'
// } inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full`}
// >
// {job.status}
// </div>