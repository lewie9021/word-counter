const CONTROLS = {
    view: [
        {style: "danger", icon: "trash", method: "_onRemoveClick"},
        {style: "info", icon: "pencil", method: "_onEditClick"}
    ],
    edit: [
        {style: "danger", icon: "remove", method: "onCancel"},
        {style: "success", icon: "ok", method: "_onSaveClick"}
    ]
};

export default CONTROLS;
