'use client';

import {
  Dialog,
} from '@/components/ui/dialog';
import {
  Drawer,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/ui';
import { cn } from '@/lib';
import * as React from 'react';
import { ScrollArea } from './scroll-area';

interface BaseProps {
  children: React.ReactNode;
}

interface RootCredenzaProps extends BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface CredenzaProps extends BaseProps {
  className?: string;
  asChild?: true;
}

const CredenzaContext = React.createContext<{ isDesktop: boolean }>({
  isDesktop: false,
});

const useCredenzaContext = () => {
  const context = React.useContext(CredenzaContext);
  if (!context) {
    throw new Error('Credenza components cannot be rendered outside the Credenza Context');
  }
  return context;
};

interface CredenzaComponent extends React.FC<RootCredenzaProps> {
  Trigger: React.FC<CredenzaProps>;
  Close: React.FC<CredenzaProps>;
  Content: React.FC<CredenzaProps>;
  Description: React.FC<CredenzaProps>;
  Header: React.FC<CredenzaProps>;
  Title: React.FC<CredenzaProps>;
  Body: React.FC<CredenzaProps>;
  Footer: React.FC<CredenzaProps>;
}

const Credenza: CredenzaComponent = ({ children, ...props }: RootCredenzaProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const CredenzaComponent = isDesktop ? Dialog : Drawer;

  return (
    <CredenzaContext.Provider value={{ isDesktop }}>
      <CredenzaComponent {...props} {...(!isDesktop && { autoFocus: true })}>
        {children}
      </CredenzaComponent>
    </CredenzaContext.Provider>
  );
};

const CredenzaTrigger = ({ className, children, ...props }: CredenzaProps) => {
  const { isDesktop } = useCredenzaContext();
  const TriggerComponent = isDesktop ? Dialog.Trigger : Drawer.Trigger;

  return (
    <TriggerComponent className={className} {...props}>
      {children}
    </TriggerComponent>
  );
};

const CredenzaClose = ({ className, children, ...props }: CredenzaProps) => {
  const { isDesktop } = useCredenzaContext();
  const CloseComponent = isDesktop ? Dialog.Close : Drawer.Close;

  return (
    <CloseComponent className={className} {...props}>
      {children}
    </CloseComponent>
  );
};

const CredenzaContent = ({ className, children, ...props }: CredenzaProps) => {
  const { isDesktop } = useCredenzaContext();
  const ContentComponent = isDesktop ? Dialog.Content : Drawer.Content;

  return (
    <ContentComponent
      className={cn(
        !isDesktop ? 'flex h-[90%] flex-col pb-4 md:pb-0' : '',
        className,
      )}
      {...props}>
      {isDesktop ? children : <ScrollArea>{children}</ScrollArea>}
    </ContentComponent>
  );
};

const CredenzaDescription = ({ className, children, ...props }: CredenzaProps) => {
  const { isDesktop } = useCredenzaContext();
  const DescriptionComponent = isDesktop ? Dialog.Description : Drawer.Description;

  return (
    <DescriptionComponent className={className} {...props}>
      {children}
    </DescriptionComponent>
  );
};

const CredenzaHeader = ({ className, children, ...props }: CredenzaProps) => {
  const { isDesktop } = useCredenzaContext();
  const HeaderComponent = isDesktop ? Dialog.Header : Drawer.Header;

  return (
    <HeaderComponent className={className} {...props}>
      {children}
    </HeaderComponent>
  );
};

const CredenzaTitle = ({ className, children, ...props }: CredenzaProps) => {
  const { isDesktop } = useCredenzaContext();
  const TitleComponent = isDesktop ? Dialog.Title : Drawer.Title;

  return (
    <TitleComponent className={className} {...props}>
      {children}
    </TitleComponent>
  );
};

const CredenzaBody = ({ className, children, ...props }: CredenzaProps) => {
  return (
    <div className={cn('px-4 md:px-0', className)} {...props}>
      {children}
    </div>
  );
};

const CredenzaFooter = ({ className, children, ...props }: CredenzaProps) => {
  const { isDesktop } = useCredenzaContext();
  const FooterComponent = isDesktop ? Dialog.Footer : Drawer.Footer;

  return (
    <FooterComponent className={className} {...props}>
      {children}
    </FooterComponent>
  );
};

Credenza.Trigger = CredenzaTrigger;
Credenza.Close = CredenzaClose;
Credenza.Content = CredenzaContent;
Credenza.Description = CredenzaDescription;
Credenza.Header = CredenzaHeader;
Credenza.Title = CredenzaTitle;
Credenza.Body = CredenzaBody;
Credenza.Footer = CredenzaFooter;

export {
  Credenza, type CredenzaComponent
};
