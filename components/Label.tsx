type LabelParams = {
    className: string | undefined;
    children: React.ReactNode
    htmlFor: string;
}

const Label = ({ className, children, ...props }: LabelParams) => (
    <label
        className={`${className} block font-medium text-sm text-gray-700`}
        {...props}>
        {children}
    </label>
)

export default Label
