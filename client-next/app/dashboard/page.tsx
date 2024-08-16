import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card"
import {BookOpenIcon, GitBranchIcon, GithubIcon, HomeIcon, MoveHorizontalIcon} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";

export default function DashboardPage() {
    return <div className={"grid gap-6 md:grid-cols-2 lg:grid-cols-3"}>
        {
            Array(30).fill(() => "").map((_, i) => {
                return <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <BookOpenIcon className="w-8 h-8" />
                        <div className="grid gap-1">
                            <CardTitle>docs</CardTitle>
                            <CardDescription>docs.example.com</CardDescription>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="ml-auto">
                                    <MoveHorizontalIcon className="w-4 h-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Project</DropdownMenuItem>
                                <DropdownMenuItem>View Settings</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                        <div className="text-sm font-semibold">docs: add docs for memberships</div>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                                <GithubIcon className="w-4 h-4" />
                                <span className="text-muted-foreground">1 day ago</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <GitBranchIcon className="w-4 h-4" />
                                <span className="text-muted-foreground">main</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            })
        }

    </div>
}