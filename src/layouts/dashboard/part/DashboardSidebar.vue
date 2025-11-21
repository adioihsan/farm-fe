<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { RouterLink, useRouter } from "vue-router";
import {
  LayoutDashboardIcon,
  WarehouseIcon,
  ChevronRight,
  GalleryVerticalEndIcon,
  ChevronUp,
  User2
} from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth.store";
import { handleApiErrors } from "@/lib/errorHandler";
import { useToast } from "vue-toastification";

const useAuth = useAuthStore()
const toast = useToast()
const router = useRouter()

const handleLogout =async ()=>{
  try {
    await useAuth.logout()
    toast.success("You are logged out")
    router.push({name:"Login"})
  } catch (error) {
    const errMsg = handleApiErrors(error,undefined)
    toast.error(errMsg)
  }
  await useAuth.logout()
}

</script>

<template>
  <Sidebar collapsible="icon" variant="inset">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <div
              class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
            >
              <GalleryVerticalEndIcon class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">Japfa Farm</span>
              <span class="truncate text-xs">Enterprise</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton as-child>
                <RouterLink
                  to="/"
                  activeClass="font-medium"
                  exactActiveClass="font-semibold"
                >
                  <LayoutDashboardIcon />
                  <span>DashBoard</span>
                </RouterLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Collapsible default-open class="group/collapsible">
                <CollapsibleTrigger as-child>
                  <RouterLink
                    to="/farm"
                    activeClass="font-medium"
                    exactActiveClass="font-semibold"
                  >
                    <SidebarMenuButton>
                      <WarehouseIcon />
                      <span>Farm</span>
                      <ChevronRight
                        class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
                      />
                    </SidebarMenuButton>
                  </RouterLink>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuItem>
                      <RouterLink
                        to="/farm/create"
                        activeClass="font-medium"
                        exactActiveClass="font-semibold"
                      >
                        <SidebarMenuButton>
                          <span>Add Farm</span>
                        </SidebarMenuButton>
                      </RouterLink>
                    </SidebarMenuItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <SidebarMenuButton>
                <User2 /> <span>{{ useAuth.me?.name }}</span>
                <ChevronUp class="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              class="w-(--reka-popper-anchor-width)"
            >
              <DropdownMenuItem @click="handleLogout">
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
