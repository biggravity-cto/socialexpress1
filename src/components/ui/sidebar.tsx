
import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, Menu } from "lucide-react"
import { NavLink } from "react-router-dom"
import { Button } from "./button"

const SidebarContext = React.createContext<{
  expanded: boolean
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

export function SidebarProvider({
  children,
  defaultExpanded = true,
}: {
  children: React.ReactNode
  defaultExpanded?: boolean
}) {
  const [expanded, setExpanded] = React.useState(defaultExpanded)

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }

  return context
}

export function SidebarTrigger() {
  const { expanded, setExpanded } = useSidebar()

  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9 absolute left-4 top-4 z-50 lg:hidden"
      onClick={() => setExpanded((v) => !v)}
    >
      <Menu />
    </Button>
  )
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { expanded, setExpanded } = useSidebar()

  return (
    <div
      className={cn(
        `absolute inset-y-0 left-0 z-40 flex w-[220px] -translate-x-full flex-col bg-background transition-transform lg:relative lg:translate-x-0`,
        expanded && "translate-x-0"
      )}
    >
      <div className="flex flex-1 flex-col border-r">
        <div className="flex h-14 items-center py-4 px-4 lg:h-[60px]">
          <span className="text-xl font-bold">SocialSync</span>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-8 w-8 lg:hidden"
            onClick={() => setExpanded(false)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function SidebarHeader({ children }: { children?: React.ReactNode }) {
  return <div className="my-2 px-4">{children}</div>
}

export function SidebarContent({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 flex-col">{children}</div>
}

export function SidebarGroup({
  children,
  title,
}: {
  children?: React.ReactNode
  title?: string
}) {
  return (
    <div className="space-y-1 py-1">
      {title && (
        <div className="px-4 py-1">
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        </div>
      )}
      {children}
    </div>
  )
}

export function SidebarGroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-1">
      <div className="text-xs font-medium tracking-tight text-muted-foreground">
        {children}
      </div>
    </div>
  )
}

export function SidebarGroupContent({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="space-y-0.5">{children}</div>
}

export function SidebarMenu({ children }: { children: React.ReactNode }) {
  return <nav className="grid gap-0.5">{children}</nav>
}

export function SidebarMenuItem({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export function SidebarMenuButton({
  asChild,
  children,
  className,
  ...props
}: {
  asChild?: boolean
  children: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const Component = asChild ? React.Fragment : "button"

  return (
    <Component
      className={cn(
        "inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export function SidebarFooter({ children }: { children?: React.ReactNode }) {
  return <div className="my-2 px-4">{children}</div>
}

export function SidebarLink({
  children,
  to,
  className,
  icon,
}: {
  children: React.ReactNode
  to: string
  className?: string
  icon?: React.ReactNode
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-foreground",
          isActive
            ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
            : "text-muted-foreground",
          className
        )
      }
    >
      {icon && <span className="h-4 w-4">{icon}</span>}
      <span>{children}</span>
    </NavLink>
  )
}
