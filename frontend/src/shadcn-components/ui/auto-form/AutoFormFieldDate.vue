<script setup lang="ts">
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'
import { beautifyObjectName } from './utils'
import AutoFormLabel from './AutoFormLabel.vue'
import type { FieldProps } from './interface'
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/shadcn-components/ui/form'

import { Calendar } from '@/shadcn-components/ui/calendar'
import { Button } from '@/shadcn-components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn-components/ui/popover'
import { cn } from '@/lib/shadcn-utils'

defineProps<FieldProps>()

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem>
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <div>
            <Popover>
              <PopoverTrigger as-child :disabled="disabled">
                <Button
                  variant="outline"
                  :class="cn(
                    'w-full justify-start text-left font-normal',
                    !slotProps.componentField.modelValue && 'text-neutral-500 dark:text-neutral-400',
                  )"
                >
                  <CalendarIcon class="mr-2 h-4 w-4" :size="16" />
                  {{ slotProps.componentField.modelValue ? df.format(slotProps.componentField.modelValue.toDate(getLocalTimeZone())) : "Pick a date" }}
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <Calendar initial-focus v-bind="slotProps.componentField" />
              </PopoverContent>
            </Popover>
          </div>
        </slot>
      </FormControl>

      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
