import type { IFarm } from '@/interfaces/farm.interface'
import type { ColumnDef } from '@tanstack/vue-table'
import DropdownAction from "@/components/pages/farm/FarmTableDropdown.vue"
import { h } from 'vue'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-vue-next'

export const farmColumns: ColumnDef<IFarm>[] = [
    {
        accessorKey: 'farmName',
        header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Farm Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('farmName')),
    },
    {
        accessorKey: 'ownerName',
        header: () => h('div', { class: 'font-semibold' }, 'Owner'),
        cell: ({ row }) => h('div', {}, row.getValue('ownerName')),
    },
    {
        accessorKey: 'location',
        header: () => h('div', { class: 'font-semibold' }, 'Location'),
    },
    {
        accessorKey: 'isPartner',
        header: () => h('div', { class: 'font-semibold text-center' }, 'Partner'),
        cell: ({ row }) => {
            const v = row.getValue('isPartner')
            return h(
                'div',
                {
                    class: `text-center font-medium border rounded-xl ${v ? 'text-green-600' : 'text-red-600'}`,
                },
                v ? 'Yes' : 'No',

            )
        },
    },
    {
        accessorKey: 'createdAt',
        header: () => h('div', { class: 'font-semibold' }, 'Created At'),
        cell: ({ row }) => {
            const date = new Date(row.getValue('createdAt'))
            return h('div', {}, date.toLocaleDateString())
        },
    },
    {
        accessorKey: 'updatedAt',
        header: () => h('div', { class: 'font-semibold' }, 'Updated At'),
        cell: ({ row }) => {
            const date = new Date(row.getValue('updatedAt'))
            return h('div', {}, date.toLocaleDateString())
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const farm = row.original
            return h('div', { class: 'relative' }, h(DropdownAction, {
                farm,
            },))
        },
    },
]
