// src/components/Icon.tsx
import * as Icons from '../icons';

export type IconName = keyof typeof Icons;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  className?: string;
}

export const Icon = ({ name, className, ...props }: IconProps) => {
  const Component = Icons[name];
  return Component ? <Component className={className} {...props} /> : null;
};