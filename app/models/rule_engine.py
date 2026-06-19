"""Rule engine for automatic plant care control"""


class RuleEngine:
    """Applies automatic control rules based on sensor readings"""
    
    def __init__(self, sensor_manager, actuator_manager):
        self.sensor_manager = sensor_manager
        self.actuator_manager = actuator_manager
        self.rules = {}
        self.enabled = False
    
    def add_rule(self, rule_id, condition_func, action_func):
        """Add a control rule"""
        self.rules[rule_id] = {
            "condition": condition_func,
            "action": action_func,
            "enabled": True
        }
    
    def enable(self):
        """Enable automatic rule execution"""
        self.enabled = True
    
    def disable(self):
        """Disable automatic rule execution"""
        self.enabled = False
    
    def evaluate_rules(self, current_readings):
        """Evaluate all rules and execute actions if conditions are met"""
        if not self.enabled:
            return {"status": "disabled"}
        
        executed_actions = []
        
        for rule_id, rule in self.rules.items():
            if rule["enabled"]:
                try:
                    if rule["condition"](current_readings):
                        result = rule["action"]()
                        executed_actions.append({
                            "rule_id": rule_id,
                            "result": result
                        })
                except Exception as e:
                    executed_actions.append({
                        "rule_id": rule_id,
                        "error": str(e)
                    })
        
        return {
            "status": "evaluated",
            "actions_executed": len(executed_actions),
            "details": executed_actions
        }
