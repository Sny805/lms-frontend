import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Edit } from "lucide-react"
import { useNavigate } from "react-router-dom"



export default function TableDemo({ courses }) {

    const navigate = useNavigate()
    return (
        <Table>
            <TableCaption>A list of your recent courses.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Title</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {courses.map((course) => (
                    <TableRow key={course._id}>
                        <TableCell className="font-medium">{course?.courseTitle}</TableCell>
                        <TableCell>{course?.coursePrice || "NA"}</TableCell>
                        <TableCell><Badge>{course?.isPublished ? "Published" : "Draft"}</Badge></TableCell>
                        <TableCell className="text-right">
                            <Button size='sm' variant='ghost' className="cursor-pointer" onClick={() => navigate(`${course._id}`)}><Edit /></Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

        </Table>
    )
}
