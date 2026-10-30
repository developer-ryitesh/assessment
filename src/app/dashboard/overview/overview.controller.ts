import { FiFolder, FiCheckSquare, FiCheckCircle, FiUsers } from "react-icons/fi";

export default function useOverviewController() {
   const stats = [
      {
         title: "Total Projects",
         value: "24",
         change: "+12%",
         icon: FiFolder,
         color: "bg-blue-50 text-blue-600",
      },
      {
         title: "Total Tasks",
         value: "156",
         change: "+8.5%",
         icon: FiCheckSquare,
         color: "bg-purple-50 text-purple-600",
      },
      {
         title: "Completed",
         value: "108",
         change: "+15%",
         icon: FiCheckCircle,
         color: "bg-green-50 text-green-600",
      },
      {
         title: "Team Members",
         value: "12",
         change: "+2",
         icon: FiUsers,
         color: "bg-orange-50 text-orange-600",
      },
   ];
   return { stats };
}
