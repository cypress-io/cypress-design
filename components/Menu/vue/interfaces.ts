import { WindiColor } from '@cypress-design/vue-icon'
import { Component } from 'vue'

export interface IconSet {
  icon: Component<{
    strokeColor: WindiColor
    fillColor: WindiColor
    hoverFillColor: WindiColor
  }>
  iconActive: Component<{ animated: boolean }>
}
