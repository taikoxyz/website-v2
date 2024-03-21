export type ISelectDefaultItem = {
    name: string | number;
    value: string | number | object;
};

export type ISelectClassNames = {
    root?: string;
    label?: string;
    container?: string;
    valueContainer?: string;
    value?: string;
    dropdown?: string;
    dropdownContainer?: string;
    option?: string;
    optionActive?: string;
    arrow?: string;
};

export type ISelectBaseProps<T extends ISelectDefaultItem | object> = {
    options: T[];
    classNames?: ISelectClassNames;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    disabledInput?: boolean;
    inputValue?: string;
    value: T | null;
    render?: {
        arrow?: () => JSX.Element;
        label?: () => JSX.Element;
        option?: (data: T, active: boolean) => JSX.Element;
    }
    onChangeInput?: (value: string) => void;
    onChange?: (value: T | null) => void;
};

export type iSelectParams<T extends ISelectDefaultItem | object> = T extends ISelectDefaultItem
    ? {
        renderName?: 'name';
        renderKey?: 'value';
      }
    : {
          renderKey: keyof T;
          renderName: keyof T;
      };

export type ISelectProps<T extends ISelectDefaultItem | object> = ISelectBaseProps<T> &
    iSelectParams<T>;
