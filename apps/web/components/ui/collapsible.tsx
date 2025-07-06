'use client';

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as React from 'react';

const CollapsibleBase = CollapsiblePrimitive.Root;

type CollapsibleComponent = React.ForwardRefExoticComponent<CollapsiblePrimitive.CollapsibleProps & React.RefAttributes<HTMLDivElement>> & {
  Trigger: typeof CollapsiblePrimitive.CollapsibleTrigger;
  Content: typeof CollapsiblePrimitive.CollapsibleContent;
};

const Collapsible = CollapsibleBase as CollapsibleComponent;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

Collapsible.Trigger = CollapsibleTrigger;
Collapsible.Content = CollapsibleContent;

export { Collapsible, type CollapsibleComponent };
