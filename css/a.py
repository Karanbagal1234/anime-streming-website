class Solution:
    def defangIPaddr(self, address: str) -> str:
        return address.replace(".", "[.]")

# Create an instance of the Solution class
solution_instance = Solution()

# Call the defangIPaddr method with an IP address
result = solution_instance.defangIPaddr("192.168.1.1")

# Print the result
print(result)

