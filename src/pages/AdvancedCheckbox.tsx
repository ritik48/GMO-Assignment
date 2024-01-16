import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Typography } from "@mui/material";

interface AdvanceCheckboxProps {
    childCheckboxes: string[];
    parent: string;
}

export default function AdvanceCheckbox({
    childCheckboxes,
    parent,
}: AdvanceCheckboxProps) {
    const [checked, setChecked] = React.useState<boolean[]>(
        Array(childCheckboxes.length).fill(false)
    );

    const [expanded, setExpanded] = React.useState<boolean>(false);

    const handleChangeParent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(checked.map(() => event.target.checked));
    };

    const handleChangeChild =
        (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
            const newChecked = [...checked];
            newChecked[index] = event.target.checked;
            setChecked(newChecked);
        };

    const handleToggleExpand = () => {
        setExpanded(!expanded);
    };

    const allChecked: boolean = checked.every((c) => c === true);

    return (
        <div style={{ width: "max-content" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormControlLabel
                    label={parent}
                    control={
                        <Checkbox
                            checked={allChecked}
                            onChange={handleChangeParent}
                        />
                    }
                />
                <Typography
                    sx={{ color: "grey" }}
                >{`(${childCheckboxes.length})`}</Typography>
                <IconButton onClick={handleToggleExpand}>
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </Box>
            <Collapse in={expanded}>
                <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                    {childCheckboxes.map((child, index) => (
                        <FormControlLabel
                            key={index}
                            label={child}
                            control={
                                <Checkbox
                                    checked={checked[index]}
                                    onChange={handleChangeChild(index)}
                                />
                            }
                        />
                    ))}
                </Box>
            </Collapse>
        </div>
    );
}
